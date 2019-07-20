import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { WebsocketServer } from "../core/websocket-server";
import { EVENTS } from "@live/constants";
import * as Ffmpeg from "fluent-ffmpeg";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {
  private _command: any;
  public isStreaming: boolean;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("FfmpegLogger") private _ffmpegLogger: Logger,
    @inject("WebsocketService") private _websocketServer: WebsocketServer,
    private _device: Device,
    private _streamId: string) {
    this.initializeFfmpegCommand();
  }

  public get hasValidDevice(): boolean {
    return this._device.state !== DeviceState.UnknownDevice;
  }

  private initializeFfmpegCommand(): void {
    this._command = Ffmpeg()
      .input(this._device.id)
      .inputOptions("-y")
      .inputOptions("-f alsa")
      .audioChannels(2)
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
        if (!error.message.includes("SIGKILL")) {
          this._logger.error(`Error ffmpeg command for device ${this._device.id}: ${error}.`);
        }
      })
      .on("stderr", (data: string) => {
        this._ffmpegLogger.info(`${data}`);
      })
      .on("end", () => { });
  }

  public startStreaming(): void {
    this._logger.debug(`Start streaming for device ${this._device.id}.`);
    this._websocketServer.addStream(this._streamId);
    this._command
      .pipe()
      .on("data", (data: Buffer) => this._websocketServer.emitStreamData(this._streamId, data));
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.debug(`Killing child process for device ${this._device.id}.`);
    this._command.kill("SIGKILL");
    this._websocketServer.removeStream(this._streamId);
    this._websocketServer.emitEventMessage(this._streamId, EVENTS.streamEnded, "The stream ended.");
    this.isStreaming = false;
  }
}
