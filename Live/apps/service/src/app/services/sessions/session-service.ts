import { SessionEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { ISessionRepository } from "./i-session-repository";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("ISessionRepository") private readonly _sessionRepository: ISessionRepository) {
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
    this._logger.info(`Created session ${JSON.stringify(createdSessionEntity)}`);

    return createdSessionEntity;
  }

  public deleteSession(id: string) {
    this._sessionRepository.deleteSessionEntity(id);
    this._logger.debug(`Deleted session ${id}`);
  }
}
