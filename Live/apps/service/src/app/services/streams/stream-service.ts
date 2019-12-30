import { StreamEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { IStreamRepository } from "./i-stream-repository";
import { Stream } from "./stream";

/**
 * A class providing methods to manage streams
 */
@injectable()
export class StreamService {
  private _streams: Stream[];

  public get streams(): Stream[] {
    return this._streams;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("IStreamRepository") private _streamRepository: IStreamRepository,
    @inject("StreamFactory") private streamFactory: (streamEntity: StreamEntity) => Stream) {
  }

  public loadStreams(): void {
    this._logger.debug("Loading streams");

    const streamEntities = this._streamRepository.loadStreamEntities();

    if (streamEntities.length === 0) {
      this._logger.warn("No streams available for loading");
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

  public createStream(streamEntity: StreamEntity): StreamEntity {
    const createdStreamEntity = this._streamRepository.createStreamEntity(streamEntity);
    this._streams.push(this.convertStream(createdStreamEntity));
    this._logger.info(`Created stream ${JSON.stringify(streamEntity)}`);

    return createdStreamEntity;
  }

  public deleteStream(streamEntity: StreamEntity): void {
    this._streamRepository.deleteStream(streamEntity);
    this._logger.debug(`Deleted stream ${streamEntity.id}`);
  }
}
