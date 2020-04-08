import { inject, injectable } from "inversify";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { WebsocketServer } from "../../core/websocket-server";
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
    private _deviceId: string,
    private _streamId: string) {
    this._logger.debug("Instantiating StreamingSimulationSource");
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
