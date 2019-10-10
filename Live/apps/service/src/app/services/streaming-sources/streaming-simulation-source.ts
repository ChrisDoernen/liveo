import { inject, injectable } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { Logger } from "../logging/logger";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Class for simulating live streaming
 */
@injectable()
export class StreamingSimulationSource implements IStreamingSource {
  public isStreaming: boolean;

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("WebsocketServer") private _websocketServer: WebsocketServer,
    private _device: Device,
    private _streamId: string) {
    this._logger.info("Instantiating StreamingSimulationSource");
  }

  public get hasValidDevice(): boolean {
    return this._device.state !== DeviceState.UnknownDevice;
  }

  public startStreaming(): void {
    this._websocketServer.addStream(this._streamId);
    this._logger.warn("Simulating start of streaming.");
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.warn("Simulating end of streaming.");
    this._websocketServer.removeStream(this._streamId);
    this.isStreaming = false;
  }
}
