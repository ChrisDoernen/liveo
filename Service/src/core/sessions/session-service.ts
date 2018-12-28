import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { Session } from "./session";
import { DataService } from "../data/data-service";

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
    public activeSession: Session;

    constructor(private logger: Logger,
        private dataService: DataService) {
        this.loadSessions();
    }

    private loadSessions(): void {
        this.logger.debug("Loading sessions.");

        this.sessions = this.dataService.loadSessions();

        if (!this.sessions || !this.sessions.some) {
            this.logger.warn("No session available for loading.");
        } else {
            this.sessions.forEach((session) => {
                this.logger.debug(`Loaded session ${JSON.stringify(session)}.`);
            });
        }
    }

    public activateSession(sessionToActivate: Session): Session {
        if (this.sessions.some((session) => session.id == sessionToActivate.id)) {
            this.activeSession = sessionToActivate;
        } else {
            throw new Error(`Session with id ${sessionToActivate.id} was not found.`);
        }

        return this.activeSession;
    }
}
