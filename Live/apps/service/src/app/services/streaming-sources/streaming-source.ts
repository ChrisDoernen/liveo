import { EVENTS } from "@live/constants";
import * as Ffmpeg from "fluent-ffmpeg";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as net from "net";
import * as path from "path";
import { config } from "../../config/service.config";
import { WebsocketServer } from "../../core/websocket-server";
import { Logger } from "../logging/logger";
import { PlatformConstants } from "../platform-constants/i-platform-constants";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource implements IStreamingSource {
  private _command: Ffmpeg.FfmpegCommand;
  public isStreaming: boolean;
  private _socketServer: net.Server;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("FfmpegLogger") private _ffmpegLogger: Logger,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    @inject("PlattformConstants") private _plattformConstants: PlatformConstants,
    public deviceId: string,
    public streamingId: string,
    private _bitrate: number,
    private _onError: (error: Error) => void) {
  }

  private initialize(socketAddress: string): Ffmpeg.FfmpegCommand {
    return Ffmpeg()
      .input(this._plattformConstants.devicePrefix + this.deviceId)
      .inputOptions("-y")
      .inputOptions(`-f ${this._plattformConstants.audioModule}`)
      .complexFilter(
        `asplit=[out][stats];[stats]ebur128=metadata=1,ametadata=print:key=lavfi.r128.M:file='${socketAddress}':direct=1,anullsink`
      )
      .outputOptions("-map [out]")
      .outputOptions("-ac 2")
      .outputOptions(`-b:a ${this._bitrate}k`)
      .outputOptions("-acodec libmp3lame")
      .outputOptions("-f mp3")
      .outputOptions("-probesize 64")
      .outputOptions("-rtbufsize 64")
      .outputOptions("-reservoir 0")
      .outputOptions("-fflags")
      .outputOptions("+nobuffer")
      .outputOptions("-nostdin")
      .outputOptions("-hide_banner")
      .on("start", (command: string) => {
        this._logger.debug(`Started streaming for device ${this.deviceId} with command ${command}.`);
      })
      .on("error", (error: Error) => {
        // We terminated the stream manually to stop streaming, no real error
        if (!error.message.includes("SIGKILL")) {

        }
      })
      .on("stderr", (data: string) => {
        this._ffmpegLogger.info(`${data}`);
      })
      .on("end", () => {
        this._logger.error(`Error ffmpeg command for device ${this.deviceId}`);
        this._onError(new Error("Stream ended unexpectedly"));
        this.cleanUp();
      });
  }

  private createSocket(): string {
    const socketDir = path.join(config.workingDirectory, "sockets");
    const socketId = `${this.streamingId}.sock`;
    const socketPath = path.join(socketDir, socketId);

    let socket: string;
    let socketAddress: string;
    if (config.platform === "win32") {
      socket = path.join(this._plattformConstants.ipcProtocol, socketId);
      socketAddress = socket.replace(/\\/g, "\\\\").replace(":", "\\\\\\:");
    } else {
      socket = socketPath;
      socketAddress = path.join(this._plattformConstants.ipcProtocol, socket);;
    }

    // Remove existing sockets before opening a new one. Windows removes named pipes automatically.
    if (config.platform !== "win32") {
      if (!fs.existsSync(socketDir)) {
        fs.mkdirSync(socketDir);
      } else if (fs.existsSync(socket)) {
        fs.unlinkSync(socket);
      }
    }

    const server = net.createServer((stream) => {
      stream.on("data", (data: Buffer) => {
        const lines = data.toString().split("\n");
        lines.forEach((line) => {
          if (line.startsWith("lavfi.")) {
            const value = line.substr(13);
            const loudness = this.convertLUScale9ToLUFSScal18(value).toFixed(1);
            this._websocketServer.emitAdminEventMessage(`${EVENTS.streamVolume}-${this.streamingId}`, loudness);
          }
        });
      });
    });

    this._logger.debug(`Listening on socket or pipe ${socket}`);
    server.listen(socket);
    this._socketServer = server;

    return socketAddress;
  }

  /**
   * Converts relative LU value to absolute LUFS value.
   * The input on the linux version of ffmpeg is based on a EBU R128 +9 scale, having a target of -23 LUFS as default.
   * To be able to adjust scale and target, we have to normalize to the absolute +18 scale.
   * @param value Loudness in LU (relative) 
   */
  private convertLUScale9ToLUFSScal18(value: string): number {
    const valueNumber = parseFloat(value);

    let mLUFSScale18: number;
    if (config.platform === "linux") {
      mLUFSScale18 = (valueNumber * 2) - 23;
    } else {
      mLUFSScale18 = valueNumber;
    }

    return mLUFSScale18;
  }

  private closeSocket(): void {
    this._socketServer.close();
  }

  public startStreaming(): void {
    this._logger.debug(`Start streaming for device ${this.deviceId} with streaming source id ${this.streamingId}`);
    this._websocketServer.addStream(this.streamingId);
    const socket = this.createSocket();
    this._command = this.initialize(socket);
    this._command.pipe().on("data", (data: Buffer) => this._websocketServer.emitStreamData(this.streamingId, data));
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.debug(`Killing child process for device ${this.deviceId} with streaming source id ${this.streamingId}`);
    this._command.kill("SIGKILL");
    this.cleanUp();
  }

  private cleanUp(): void {
    this.closeSocket();
    this._command = null;
    this._websocketServer.removeStream(this.streamingId);
    this._websocketServer.emitStreamEventMessage(this.streamingId, EVENTS.streamEnded, "The stream ended.");
    this.isStreaming = false;
  }
}
