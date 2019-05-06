import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { DataService } from "../data/data-service";
import { Stream } from "./stream";
import { StreamEntity } from "@live/entities";

/**
 * A class providing methods to manage streams
 */
@injectable()
export class StreamService {
  private _streams: Stream[];

  public get streams(): Stream[] {
    return this._streams;
  }

  constructor(@inject("Logger") private _logger: Logger,
    @inject("DataService") private _dataService: DataService,
    @inject("StreamFactory") private streamFactory: (streamEntity: StreamEntity) => Stream) {
  }

  public loadStreams(): void {
    this._logger.debug("Loading streams.");

    const streamEntities = this._dataService.loadStreamEntities();

    if (streamEntities.length === 0) {
      this._logger.warn("No streams available for loading.");
    } else {
      this._streams = streamEntities.map(entities => this.convertStream(entities));
    }
  }

  private convertStream(streamEntity: StreamEntity): Stream {
    return this.streamFactory(streamEntity);
  }

  public getStreamEntities(): StreamEntity[] {
    return this._streams.map((stream: Stream) => stream.entity);
  }

  public getStreamEntity(id: string): StreamEntity {
    const matchingStream = this._streams.find(stream => stream.id === id);
    return matchingStream ? matchingStream.entity : null;
  }

  public createStream(streamEntity: StreamEntity): void {
    this._streams.push(this.convertStream(streamEntity));
    this._logger.info(`Created stream ${JSON.stringify(streamEntity)}.`);
  }
}
