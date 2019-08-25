import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { WebsocketServer } from "../core/websocket-server";
import { EVENTS } from "@live/constants";
import * as Ffmpeg from "fluent-ffmpeg";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Streams from a file source for testing purposes
 */
@injectable()
export class FileStreamingSource implements IStreamingSource {
  private _command: any;
  public isStreaming: boolean;
  private _input = this._device.id;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("FfmpegLogger") private _ffmpegLogger: Logger,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    private _device: Device,
    private _streamId: string) {
    this.initializeFfmpegCommand();
  }

  public get hasValidDevice(): boolean {
    return this._device.state !== DeviceState.UnknownDevice;
  }

  private initializeFfmpegCommand(): void {
    this._command = Ffmpeg()
      .input(this._input)
      .inputOptions("-re")
      .audioBitrate("196k")
      .audioCodec("libmp3lame")
      .format("mp3")
      .outputOptions(["-probesize 64"])
      .outputOptions(["-rtbufsize 64"])
      .outputOptions(["-reservoir 0"])
      .outputOptions(["-fflags"])
      .outputOptions(["+nobuffer"])
      .outputOptions(["-hide_banner"])
      .on("start", (command: string) => {
        this._logger.debug(`Started streaming for device ${this._device.id} with command ${command}.`);
      })
      .on("error", (error: Error) => {
        // We killed the stream manually to stop streaming, no real error
        if (!error.message.includes("SIGTERM")) {
          this._logger.error(`Error ffmpeg command for device ${this._device.id}: ${error}.`);
        }
      })
      .on("stderr", (data: string) => {
        this._ffmpegLogger.info(`${data}`);
      })
      .on("end", () => {
        this._logger.debug(`Streaming ended for device ${this._device.id}.`);
      });
  }


  public startStreaming(): void {
    this._logger.debug(`Start file streaming for device ${this._device.id}.`);
    this._websocketServer.addStream(this._streamId);
    this._command
      .pipe()
      .on("data", (data: Buffer) => this._websocketServer.emitStreamData(this._streamId, data));
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.debug(`Killing child process for device ${this._device.id}.`);
    this._command.kill("SIGTERM");
    this._websocketServer.removeStream(this._streamId);
    this._websocketServer.emitStreamEventMessage(this._streamId, EVENTS.streamEnded, "The stream ended.");
    this.isStreaming = false;
  }
} 