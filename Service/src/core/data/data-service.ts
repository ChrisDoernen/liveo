import { Session } from "../sessions/session";
import { config } from "../../config/service.config";
import { Logger } from "../util/logger";
import { injectable } from "inversify";
import * as fs from "fs";
import { Stream } from "../streams/stream";

/**
 * Provides access to a file based data source
 */
@injectable()
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

    /**
     * Loads sessions
     */
    public loadStreams(): Stream[] {
        try {
            return JSON.parse(this.readFileSync(config.streams));
        } catch (error) {
            this.logger.error(`Could not load streams from file system: ${error}`);
        }
    }

    private readFileSync(file: string): string {
        return fs.readFileSync(file, "utf8");
    }
}
