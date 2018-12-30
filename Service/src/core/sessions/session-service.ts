import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { SessionData } from "./session-data";
import { DataService } from "../data/data-service";
import { StreamService } from "../streams/stream-service";
import { Session } from "./session";
import { Stream } from "../streams/stream";

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
        return this._activeSession.data;
    }

    constructor(private logger: Logger,
        private dataService: DataService,
        private streamService: StreamService,
        @inject("SessionFactory") private sessionFactory: (sessionData: SessionData, streams: Stream[]) => Session) {
        this.loadSessions();
    }

    private loadSessions(): void {
        this.logger.debug("Loading sessions.");

        const sessionsData = this.dataService.loadSessions();

        if (sessionsData.length === 0) {
            this.logger.warn("No session available for loading.");
        } else {
            this._sessions = sessionsData.map((sessionData) => this.convertSession(sessionData));
        }
    }

    private convertSession(sessionData: SessionData): Session {
        const ids = sessionData.streams;
        const availableStreams = this.streamService.streams;
        let matchingStreams = [];

        if (availableStreams) {
            matchingStreams = availableStreams.filter((stream) => ids.indexOf(stream.id) !== -1);
        }

        const matchingStreamsIds = matchingStreams.map((stream) => stream.id);
        const missingStreamIds = ids.filter((id) => matchingStreamsIds.indexOf(id) === -1);

        if (missingStreamIds.length > 0) {
            this.logger.warn(`Missing stream for ids ${JSON.stringify(missingStreamIds)}.`);
        }

        return this.sessionFactory(sessionData, matchingStreams);
    }

    /**
     * Activate the given session
     */
    public activateSession(sessionToActivate: SessionData): SessionData {
        const matchingSession = this.sessions.find((session) => session.id == sessionToActivate.id);

        if (matchingSession) {
            this._activeSession = matchingSession;
        } else {
            throw new Error(`Session with id ${sessionToActivate.id} was not found.`);
        }

        return matchingSession.data;
    }

    /**
     * Get all session data transfer objects
     */
    public getSessionData(): SessionData[] {
        return this.sessions.map((session) => session.data);
    }

    /**
     * Start the active session
     */
    public startActiveSession(): void {
        if (!this._activeSession) {
            throw new Error("No session was activated.");
        }

        this._activeSession.start();
    }
}
