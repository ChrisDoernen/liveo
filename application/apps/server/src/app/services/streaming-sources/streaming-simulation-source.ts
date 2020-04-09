
import { StreamingGateway } from "../../gateways/streaming.gateway";
import { Logger } from "../logging/logger";
import { IStreamingSource } from "./i-streaming-source";

/**
 * Class for simulating live streaming
 */
export class StreamingSimulationSource implements IStreamingSource {
  public isStreaming: boolean;

  constructor(
    private _logger: Logger,
    private _streamingGateway: StreamingGateway,
    private _deviceId: string,
    private _streamingId: string
  ) {
    this._logger.debug("Instantiating StreamingSimulationSource");
  }

  public startStreaming(): void {
    this._streamingGateway.addStream(this._streamingId);
    this._logger.warn("Simulating start of streaming.");
    this.isStreaming = true;
  }

  public stopStreaming(): void {
    this._logger.warn("Simulating end of streaming.");
    this._streamingGateway.removeStream(this._streamingId);
    this.isStreaming = false;
  }
}
