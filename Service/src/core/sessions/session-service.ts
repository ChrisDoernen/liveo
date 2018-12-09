import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { Session } from "./session-entity";

/**
 * A class providing methods to manage streaming sessions
 */
@injectable()
export class SessionService {

    public sessions: Session[];

    constructor(private logger: Logger) {
        //this.loadSessions();
    }

    // private loadSessions(): void {

    // }
}
