import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { Stream } from "./stream";
import { DataService } from "../data/data-service";

/**
 * A class providing methods to manage streams
 */
@injectable()
export class StreamService {

    /**
     * Available sessions
     */
    public streams: Stream[];

    constructor(private logger: Logger,
        private dataService: DataService) {
        this.loadStreams();
    }

    private loadStreams(): void {
        this.logger.debug("Loading streams.");

        this.streams = this.dataService.loadStreams();

        if (!this.streams || !this.streams.some) {
            this.logger.warn("No streams available for loading.");
        } else {
            this.streams.forEach((stream) => {
                this.logger.debug(`Loaded stream ${JSON.stringify(stream)}.`);
            });
        }
    }
}
