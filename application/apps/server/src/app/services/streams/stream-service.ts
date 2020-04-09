import { StreamEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { Logger } from "../logging/logger";
import { StreamRepository } from "./stream-repository";

/**
 * A class providing methods to manage streams
 */
@Injectable()
export class StreamService {

  constructor(
    private readonly _logger: Logger,
    private readonly _streamRepository: StreamRepository) {
  }

  public getStreamEntities(): StreamEntity[] {
    return this._streamRepository.getStreamEntities();
  }

  public getStreamEntity(id: string): StreamEntity {
    return this._streamRepository.getStreamEntity(id);
  }

  public createStream(streamEntity: StreamEntity): StreamEntity {
    const createdStreamEntity = this._streamRepository.createStreamEntity(streamEntity);
    this._logger.debug(`Created stream ${JSON.stringify(streamEntity)}`);

    return createdStreamEntity;
  }

  public deleteStream(id: string): void {
    this._streamRepository.deleteStreamEntity(id);
    this._logger.debug(`Deleted stream ${id}`);
  }
}
