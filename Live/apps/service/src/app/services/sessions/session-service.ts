import { SessionEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { Stream } from "../streams/stream";
import { StreamService } from "../streams/stream-service";
import { ISessionRepository } from "./i-session-repository";
import { Session } from "./session";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

  private _sessions: Session[];

  public get sessionEntities(): SessionEntity[] {
    return this._sessions.map(session => session.entity);
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("ISessionRepository") private _sessionRepository: ISessionRepository,
    @inject("StreamService") private _streamService: StreamService,
    @inject("SessionFactory") private sessionFactory: (sessionEntity: SessionEntity, streams: Stream[]) => Session) {
  }

  public loadSessions(): void {
    this._logger.debug("Loading sessions.");

    const sessionEntities = this._sessionRepository.loadSessionEntities();

    if (sessionEntities.length === 0) {
      this._logger.warn("No session available for loading.");
    } else {
      this._sessions = sessionEntities.map(entities => this.convertSession(entities));
    }
  }

  private convertSession(sessionEntity: SessionEntity): Session {
    const streamIds = sessionEntity.streams;
    const availableStreams = this._streamService.streams;
    let matchingStreams = [];

    if (availableStreams) {
      matchingStreams = availableStreams.filter(stream => streamIds.indexOf(stream.id) !== -1);
    }

    const matchingStreamsIds = matchingStreams.map(stream => stream.id);
    const missingStreamIds = streamIds.filter(id => matchingStreamsIds.indexOf(id) === -1);

    if (missingStreamIds.length > 0) {
      this._logger.warn(`Missing stream for ids ${JSON.stringify(missingStreamIds)}.`);
    }

    return this.sessionFactory(sessionEntity, matchingStreams);
  }

  private findSession(id: string): Session {
    return this._sessions.find(session => session.id === id);
  }

  public validateSessionExists(sessionId: string): void {
    if (!this.findSession(sessionId)) {
      throw new Error(`The session ${sessionId} does not exist`);
    }
  }

  public getSession(id: string): Session {
    return this.findSession(id);
  }

  public getSessionEntity(id: string): SessionEntity {
    const session = this.findSession(id);
    return session ? session.entity : null;
  }

  public createSession(sessionEntity: SessionEntity): SessionEntity {
    const createdSessionEntity = this._sessionRepository.createSessionEntity(sessionEntity);
    this._sessions.push(this.convertSession(createdSessionEntity));
    this._logger.info(`Created session ${JSON.stringify(sessionEntity)}`);

    return createdSessionEntity;
  }

  public deleteSession(sessionId: string) {
    const session = this.getSession(sessionId);
    if (session) {
      this._sessionRepository.deleteSession(session.entity);
      const sessionIndex = this._sessions.indexOf(session);
      this._sessions.splice(sessionIndex, 1);
      this._logger.debug(`Deleted session ${sessionId}`);
    }
  }
}
