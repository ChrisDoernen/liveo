import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { StreamEntity } from "./stream-entity";
import { DataService } from "../data/data-service";
import { Stream } from "./stream";

/**
 * A class providing methods to manage streams
 */
@injectable()
export class StreamService {

    public streams: Stream[];

    constructor(@inject("StreamFactory") private streamFactory: (streamEntity: StreamEntity) => Stream,
        private logger: Logger,
        private dataService: DataService) {
        this.loadStreams();
    }

    private loadStreams(): void {
        this.logger.debug("Loading streams.");

        const streamEntities = this.dataService.loadStreams();

        if (streamEntities.length === 0) {
            this.logger.warn("No streams available for loading.");
        } else {
            this.streams = streamEntities.map((streamEntity) => this.streamFactory(streamEntity));
        }
    }

    public getStreamEntities(): StreamEntity[] {
        return this.streams.map((stream: Stream) => stream.streamEntity);
    }
}
