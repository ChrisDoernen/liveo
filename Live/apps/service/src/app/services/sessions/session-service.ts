import { SessionEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { StreamService } from "../streams/stream-service";
import { ISessionRepository } from "./i-session-repository";
import { Session } from "./session";
import { SessionFactory } from "./session-factory";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("ISessionRepository") private readonly _sessionRepository: ISessionRepository,
    @inject("StreamService") private readonly _streamService: StreamService,
    @inject("SessionFactory") private sessionFactory: SessionFactory) {
  }

  public getSession(id: string): Session {
    const sessionEntity = this.getSessionEntity(id);
    return this.convertSession(sessionEntity);
  }

  private convertSession(sessionEntity: SessionEntity): Session {
    const streams = sessionEntity.streams.map((id) => this._streamService.getStream(id));

    return this.sessionFactory(sessionEntity, streams);
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
