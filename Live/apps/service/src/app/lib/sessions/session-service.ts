import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { StreamService } from "../streams/stream-service";
import { Session } from "./session";
import { Stream } from "../streams/stream";
import { SessionEntity } from "@live/entities";
import { ISessionRepository } from "./i-session-repository";

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
    const matchingSession = this._sessions.find(session => session.id === id);

    if (!matchingSession) {
      throw new Error("The requested session could not be found.");
    }

    return matchingSession;
  }

  public validateSessionExists(sessionId: string): void {
    this.findSession(sessionId);
  }

  public getSession(id: string): Session {
    return this.findSession(id);
  }

  public getSessionEntity(id: string): SessionEntity {
    return this.findSession(id).entity;
  }
}
