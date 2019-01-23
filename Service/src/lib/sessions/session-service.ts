import { Logger } from "../logging/logger";
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

    public get sessionEntities(): SessionEntity[] {
        return this._sessions.map((session) => session.entity);
    }

    public get sessionData(): SessionData[] {
        return this._sessions.map((session) => session.data);
    }

    constructor(@inject("Logger") private _logger: Logger,
        @inject("DataService") private _dataService: DataService,
        @inject("StreamService") private _streamService: StreamService,
        @inject("SessionFactory") private sessionFactory: (sessionData: SessionData, streams: Stream[]) => Session) {
    }

    public loadSessions(): void {
        this._logger.debug("Loading sessions.");

        const sessionsData = this._dataService.loadSessionData();

        if (sessionsData.length === 0) {
            this._logger.warn("No session available for loading.");
        } else {
            this._sessions = sessionsData.map((sessionData) => this.convertSession(sessionData));
        }
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

    private findSession(id: string): Session {
        const matchingSession = this._sessions.find((session) => session.id == id);

        if (!matchingSession) {
            throw new Error("The requested session could not be found.");
        }

        return matchingSession;
    }

    public getSession(id: string): Session {
        return this.findSession(id);
    }

    public getSessionEntity(id: string): SessionEntity {
        return this.findSession(id).entity;
    }

    public getSessionData(id: string): SessionData {
        return this.findSession(id).data;
    }
}
