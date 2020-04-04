import { EVENTS } from "@liveo/constants";
import * as Ffmpeg from "fluent-ffmpeg";
import { inject, injectable } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";
import { Logger } from "../logging/logger";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Streams from a file source for testing purposes
 */
@injectable()
export class FileStreamingSource implements IStreamingSource {
  private _command: any;
  public isStreaming: boolean;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("FfmpegLogger") private _ffmpegLogger: Logger,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    private _bitrate: number,
    private _deviceId: string,
    private _streamId: string) {
    this._command = this.initializeFfmpegCommand(this._deviceId);
  }

  private initializeFfmpegCommand(deviceId: string): Ffmpeg.FfmpegCommand {
    return Ffmpeg()
      .input(deviceId)
      .inputOptions("-re")
      .audioBitrate(`${this._bitrate}k`)
      .audioCodec("libmp3lame")
      .format("mp3")
      .outputOptions(["-probesize 64"])
      .outputOptions(["-rtbufsize 64"])
      .outputOptions(["-reservoir 0"])
      .outputOptions(["-fflags"])
      .outputOptions(["+nobuffer"])
      .outputOptions(["-hide_banner"])
      .on("start", (command: string) => {
        this._logger.debug(`Started streaming for device ${this._deviceId} with command ${command}.`);
      })
      .on("error", (error: Error) => {
        // We killed the stream manually to stop streaming, no real error
        if (!error.message.includes("SIGTERM")) {
          this._logger.error(`Error ffmpeg command for device ${this._deviceId}: ${error}.`);
        }
      })
      .on("stderr", (data: string) => {
        this._ffmpegLogger.info(`${data}`);
      })
      .on("end", () => {
        this._logger.debug(`Streaming ended for device ${this._deviceId}.`);
      });
  }


  public startStreaming(): void {
    this._logger.debug(`Start file streaming for device ${this._deviceId}.`);
    this._websocketServer.addStream(this._streamId);
    this._command
      .pipe()
      .on("data", (data: Buffer) => this._websocketServer.emitStreamData(this._streamId, data));
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.debug(`Killing child process for device ${this._deviceId}.`);
    this._command.kill("SIGTERM");
    this._websocketServer.removeStream(this._streamId);
    this._websocketServer.emitStreamEventMessage(this._streamId, EVENTS.streamEnded, "The stream ended.");
    this.isStreaming = false;
  }
} 