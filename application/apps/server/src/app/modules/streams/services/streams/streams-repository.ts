import { StreamEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { DataService } from "../../../database/services/data/data.service";

@Injectable()
export class StreamsRepository {
  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getStreamEntities(): StreamEntity[] {
    return this._dataService.getStreamEntities();
  }

  public getStreamEntity(id: string): StreamEntity {
    return this._dataService.getStreamEntity(id);
  }

  public createStreamEntity(streamEntity: StreamEntity): StreamEntity[] {
    return this._dataService.createStreamEntity(streamEntity);
  }

  public deleteStreamEntity(id: string): StreamEntity[] {
    return this._dataService.deleteStreamEntity(id);
  }
}