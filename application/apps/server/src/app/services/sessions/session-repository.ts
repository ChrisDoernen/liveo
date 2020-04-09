import { SessionEntity } from "@liveo/entities";
import { DataService } from "../data/data-service";

export class SessionRepository {

  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getSessionEntities(): SessionEntity[] {
    return this._dataService.getSessionEntities();
  }

  public getSessionEntity(id: string): SessionEntity {
    return this._dataService.getSessionEntity(id);
  }

  public createSessionEntity(sessionEntity: SessionEntity): SessionEntity {
    return this._dataService.createSessionEntity(sessionEntity);
  }

  public deleteSessionEntity(id: string): void {
    this._dataService.deleteSessionEntity(id);
  }
}