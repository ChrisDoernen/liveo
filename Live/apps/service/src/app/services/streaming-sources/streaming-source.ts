import { EVENTS } from "@live/constants";
import * as Ffmpeg from "fluent-ffmpeg";
import { inject, injectable } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";
import { AudioSystem } from "../audio-system/audio-system";
import { Logger } from "../logging/logger";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource implements IStreamingSource {
  private _command: Ffmpeg.FfmpegCommand;
  public isStreaming: boolean;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("FfmpegLogger") private _ffmpegLogger: Logger,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    @inject("AudioSystem") audioSystem: AudioSystem,
    public deviceId: string,
    public streamingSourceId: string,
    bitrate: number,
    onError: (error: Error) => void) {
    this._command = this.initialize(audioSystem, deviceId, bitrate, onError);
  }

  private initialize(audioSystem: AudioSystem, deviceId: string, bitrate: number, onError: (error: Error) => void): Ffmpeg.FfmpegCommand {
    return Ffmpeg()
      .input(audioSystem.devicePrefix + deviceId)
      .inputOptions("-y")
      .inputOptions(`-f ${audioSystem.audioModule}`)
      .audioChannels(2)
      .audioBitrate(`${bitrate}k`)
      .audioCodec("libmp3lame")
      .format("mp3")
      .outputOptions("-probesize 64")
      .outputOptions("-rtbufsize 64")
      .outputOptions("-reservoir 0")
      .outputOptions("-fflags")
      .outputOptions("+nobuffer")
      .outputOptions("-hide_banner")
      .on("start", (command: string) => {
        this._logger.debug(`Started streaming for device ${deviceId} with command ${command}.`);
      })
      .on("error", (error: Error) => {
        // We terminated the stream manually to stop streaming, no real error
        if (!error.message.includes("SIGKILL")) {
          this._logger.error(`Error ffmpeg command for device ${deviceId}: ${error}.`);
          onError(error);
        }
      })
      .on("stderr", (data: string) => {
        this._ffmpegLogger.info(`${data}`);
      })
      .on("end", () => { });
  }

  public startStreaming(): void {
    this._logger.debug(`Start streaming for device ${this.deviceId}.`);
    this._websocketServer.addStream(this.streamingSourceId);
    this._command.pipe()
      .on("data", (data: Buffer) => this._websocketServer.emitStreamData(this.streamingSourceId, data));
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.debug(`Killing child process for device ${this.deviceId}.`);
    this._command.kill("SIGKILL");
    this._websocketServer.removeStream(this.streamingSourceId);
    this._websocketServer.emitStreamEventMessage(this.streamingSourceId, EVENTS.streamEnded, "The stream ended.");
    this.isStreaming = false;
  }
}
