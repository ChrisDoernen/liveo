import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "../streams/stream";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Class for simulating live streaming
 */
@injectable()
export class StreamingSimulationSource implements IStreamingSource {

  constructor(@inject("Logger") private _logger: Logger,
    @inject("WebsocketService") private _websocketServer: WebsocketServer,
    private _device: Device,
    private _stream: Stream) {
    this._logger.info("Instantiating StreamingSimulationSource");
  }

  public get hasValidDevice(): boolean {
    return this._device.state !== DeviceState.UnknownDevice;
  }

  public startStreaming(): void {
    this._websocketServer.addStream(this._stream.id);
    this._logger.warn("Simulating start of streaming.");
  }

  public stopStreaming(): void {
    this._logger.warn("Simulating end of streaming.");
    this._websocketServer.removeStream(this._stream.id);
  }
}
