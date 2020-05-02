import { SessionEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { Logger } from "../../../core/services/logging/logger";
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
    const session = this._sessionRepository.getSessionEntity(id);
    if (session) {
      return session;
    }

    throw new Error(`Session ${id} not found`);
  }

  public createSession(sessionEntity: SessionEntity): SessionEntity[] {
    this._logger.debug(`Creating session ${JSON.stringify(sessionEntity)}`);
    return this._sessionRepository.createSessionEntity(sessionEntity);
  }

  public deleteSession(id: string): SessionEntity[] {
    this._logger.debug(`Deleting session ${id}`);
    return this._sessionRepository.deleteSessionEntity(id);
  }
}
