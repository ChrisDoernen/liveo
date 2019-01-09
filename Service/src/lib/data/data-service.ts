import { SessionData } from "../sessions/session-data";
import { config } from "../../config/service";
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

    public loadSessionData(): SessionData[] {
        try {
            return JSON.parse(this.readFileSync(config.sessions));
        } catch (error) {
            this._logger.error(`Could not load session data from file system: ${error}.`);
        }
    }

    public loadStreamData(): StreamData[] {
        try {
            return JSON.parse(this.readFileSync(config.streams));
        } catch (error) {
            this._logger.error(`Could not load stream data from file system: ${error}.`);
        }
    }

    private readFileSync(file: string): string {
        return fs.readFileSync(file, "utf8");
    }
}
