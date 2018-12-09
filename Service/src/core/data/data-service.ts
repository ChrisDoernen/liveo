import { Session } from "../sessions/session-entity";
import { config } from "../../config/service.config";
import { Logger } from "../util/logger";
import * as fs from "fs";

/**
 * Provides access to a file based data source
 */
export class DataService {

    constructor(private logger: Logger) { }

    /**
     * Loads sessions
     */
    public loadSessions(): Session[] {
        try {
            return JSON.parse(this.readFileSync(config.sessions));
        } catch (error) {
            this.logger.error(`Could not load sessions from file system: ${error}`);
        }
    }

    private readFileSync(file: string): string {
        return fs.readFileSync(file, "utf8");
    }
}
