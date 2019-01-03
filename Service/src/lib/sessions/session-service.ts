import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { SessionData } from "./session-data";
import { DataService } from "../data/data-service";
import { StreamService } from "../streams/stream-service";
import { Session } from "./session";
import { Stream } from "../streams/stream";
import { SessionEntity } from "./session.entity";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

    private _sessions: Session[];

    public get sessions(): Session[] {
        return this._sessions;
    }

    private _activeSession: Session;

    public get activeSessionData(): SessionData {
        return this._activeSession ? this._activeSession.data : undefined;
    }

    public get activeSessionEntity(): SessionEntity {
        return this._activeSession ? this._activeSession.entity : undefined;
    }

    constructor(@inject("Logger") private _logger: Logger,
        @inject("DataService") private _dataService: DataService,
        @inject("StreamService") private _streamService: StreamService,
        @inject("SessionFactory") private sessionFactory: (sessionData: SessionData, streams: Stream[]) => Session) {
    }

    public async loadSessions(): Promise<void> {
        return await new Promise<void>((resolve, reject) => {
            this._logger.debug("Loading sessions.");

            const sessionsData = this._dataService.loadSessionData();

            if (sessionsData.length === 0) {
                this._logger.warn("No session available for loading.");
            } else {
                this._sessions = sessionsData.map((sessionData) => this.convertSession(sessionData));
            }

            resolve();
        });
    }

    private convertSession(sessionData: SessionData): Session {
        const ids = sessionData.streams;
        const availableStreams = this._streamService.streams;
        let matchingStreams = [];

        if (availableStreams) {
            matchingStreams = availableStreams.filter((stream) => ids.indexOf(stream.id) !== -1);
        }

        const matchingStreamsIds = matchingStreams.map((stream) => stream.id);
        const missingStreamIds = ids.filter((id) => matchingStreamsIds.indexOf(id) === -1);

        if (missingStreamIds.length > 0) {
            this._logger.warn(`Missing stream for ids ${JSON.stringify(missingStreamIds)}.`);
        }

        return this.sessionFactory(sessionData, matchingStreams);
    }

    public activateSession(sessionId: string): SessionData {
        const matchingSession = this.sessions.find((session) => session.id == sessionId);

        if (!matchingSession) {
            throw new Error(`Session with id ${sessionId} was not found.`);
        }

        this._activeSession = matchingSession;
        this._logger.info(`Activated session ${this._activeSession.id}.`);
        return matchingSession.data;
    }

    public getSessionData(): SessionEntity[] {
        return this.sessions.map((session) => session.entity);
    }

    public startActiveSession(): void {
        if (!this._activeSession) {
            throw new Error("No session was activated.");
        }

        this._activeSession.start();
    }

    public stopActiveSession(): void {
        if (!this._activeSession) {
            throw new Error("No session was activated.");
        }

        this._activeSession.stop();
    }
}
