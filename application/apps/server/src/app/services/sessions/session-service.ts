import { SessionEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { Logger } from "../logging/logger";
import { SessionRepository } from "./session-repository";

/**
 * A class providing methods to manage streaming sessions
 */
@Injectable()
export class SessionService {

  constructor(
    private readonly _logger: Logger,
    private readonly _sessionRepository: SessionRepository
  ) {
  }

  public validateSessionExists(id: string): void {
    const sessionEntity = this.getSessionEntity(id);
    if (!sessionEntity) {
      throw new Error(`The session ${id} does not exist`);
    }
  }

  public get sessionEntities(): SessionEntity[] {
    return this._sessionRepository.getSessionEntities();
  }

  public getSessionEntity(id: string): SessionEntity {
    return this._sessionRepository.getSessionEntity(id);
  }

  public createSession(sessionEntity: SessionEntity): SessionEntity {
    const createdSessionEntity = this._sessionRepository.createSessionEntity(sessionEntity);
    this._logger.debug(`Created session ${JSON.stringify(createdSessionEntity)}`);

    return createdSessionEntity;
  }

  public deleteSession(id: string) {
    this._sessionRepository.deleteSessionEntity(id);
    this._logger.debug(`Deleted session ${id}`);
  }
}
