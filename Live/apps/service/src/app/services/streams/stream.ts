import { StreamEntity } from "@live/entities";
import { inject } from "inversify";
import { Logger } from "../logging/logger";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";

/**
 * Class representing a live stream
 */
export class Stream {
  private _source: IStreamingSource;

  public get id(): string {
    return this._streamEntity.id;
  }

  public get entity(): StreamEntity {
    return this._streamEntity;
  }

  private get isStarted(): boolean {
    return this._source.isStreaming;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    private _streamEntity: StreamEntity) {
    
    _logger.debug(`Loaded stream ${JSON.stringify(_streamEntity)}.`);
  }
}
