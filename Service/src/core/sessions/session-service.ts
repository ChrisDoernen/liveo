import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { Session } from "./session";
import { DataService } from "../data/data-service";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

    public sessions: Session[];

    constructor(private logger: Logger,
        private dataService: DataService) {
        this.logger.debug("Loading sessions.");
        this.loadSessions();
    }

    private loadSessions(): void {
        this.sessions = this.dataService.loadSessions();

        if (!this.sessions.some) {
            this.logger.warn("No session were loaded.");
        } else {
            this.logger.info(`Loaded ${this.sessions.length} sessions.`);
        }
    }
}
