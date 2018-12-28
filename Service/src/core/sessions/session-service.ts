import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { SessionEntity } from "./session-entity";
import { DataService } from "../data/data-service";
import { StreamService } from "../streams/stream-service";
import { Session } from "./session";
import { Stream } from "../streams/stream";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

    /**
     * Available sessions
     */
    public sessions: Session[];

    /**
     * The currently active session
     */
    public activeSession: SessionEntity;

    constructor(@inject("SessionFactory") private sessionFactory: (sessionEntity: SessionEntity, streams: Stream[]) => Session,
        private logger: Logger,
        private dataService: DataService,
        private streamService: StreamService) {
        this.loadSessions();
    }

    private loadSessions(): void {
        this.logger.debug("Loading sessions.");

        const sessionEntities = this.dataService.loadSessions();

        if (sessionEntities.length === 0) {
            this.logger.warn("No session available for loading.");
        } else {
            this.sessions = sessionEntities.map((sessionEntity) => this.mapSession(sessionEntity));
        }
    }

    /**
     * Activate the given session
     */
    public activateSession(sessionToActivate: SessionEntity): SessionEntity {
        if (this.sessions.some((session) => session.sessionEntity.id == sessionToActivate.id)) {
            this.activeSession = sessionToActivate;
        } else {
            throw new Error(`Session with id ${sessionToActivate.id} was not found.`);
        }

        return this.activeSession;
    }

    public getSessionEntities(): SessionEntity[] {
        return this.sessions.map((session) => session.sessionEntity);
    }

    private mapSession(sessionEntity: SessionEntity): Session {
        const ids = sessionEntity.streams;
        const matchingStreams = this.streamService.streams.filter((stream) => ids.indexOf(stream.streamEntity.id) !== -1);
        const matchingStreamsIds = matchingStreams.map((stream) => stream.streamEntity.id);
        const missingStreamIds = ids.filter((id) => matchingStreamsIds.indexOf(id) === -1);

        if (missingStreamIds.length > 0) {
            this.logger.warn(`Missing stream for ids ${JSON.stringify(missingStreamIds)}.`);
        }

        return this.sessionFactory(sessionEntity, matchingStreams);
    }
}
