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

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("IStreamRepository") private _streamRepository: IStreamRepository,
    @inject("StreamFactory") private _streamFactory: (streamEntity: StreamEntity) => Stream) {
  }

  public getStream(id: string): Stream {
    const streamEntity = this.getStreamEntity(id);
    return this.convertStream(streamEntity);
  }
  
  private convertStream(streamEntity: StreamEntity): Stream {
    return this._streamFactory(streamEntity);
  }

  public getStreamEntities(): StreamEntity[] {
    return this._streamRepository.getStreamEntities();
  }

  public getStreamEntity(id: string): StreamEntity {
    return this._streamRepository.getStreamEntity(id);
  }

  public createStream(streamEntity: StreamEntity): StreamEntity {
    const createdStreamEntity = this._streamRepository.createStreamEntity(streamEntity);
    this._logger.info(`Created stream ${JSON.stringify(streamEntity)}`);

    return createdStreamEntity;
  }

  public deleteStream(id: string): void {
    this._streamRepository.deleteStreamEntity(id);
    this._logger.debug(`Deleted stream ${id}`);
  }
}
