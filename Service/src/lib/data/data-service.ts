import { SessionData } from "../sessions/session-data";
import { config } from "../../config/service.config";
import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import * as fs from "fs";
import { StreamData } from "../streams/stream-data";

/**
 * Provides access to a file based data source
 */
@injectable()
export class DataService {

    constructor(@inject("Logger") private _logger: Logger) { }

    public loadSessions(): SessionData[] {
        try {
            return JSON.parse(this.readFileSync(config.sessions));
        } catch (error) {
            this._logger.error(`Could not load sessions from file system: ${error}`);
        }
    }

    public loadStreams(): StreamData[] {
        try {
            return JSON.parse(this.readFileSync(config.streams));
        } catch (error) {
            this._logger.error(`Could not load streams from file system: ${error}`);
        }
    }

    private readFileSync(file: string): string {
        return fs.readFileSync(file, "utf8");
    }
}
