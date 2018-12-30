import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { StreamData } from "./stream-data";
import { DataService } from "../data/data-service";
import { Stream } from "./stream";

/**
 * A class providing methods to manage streams
 */
@injectable()
export class StreamService {

    private _streams: Stream[];

    public get streams(): Stream[] {
        return this._streams;
    }

    constructor(@inject("StreamFactory") private streamFactory: (streamEntity: StreamData) => Stream,
        private logger: Logger,
        private dataService: DataService) {
        this.loadStreams();
    }

    private loadStreams(): void {
        this.logger.debug("Loading streams.");

        const streamData = this.dataService.loadStreams();

        if (streamData.length === 0) {
            this.logger.warn("No streams available for loading.");
        } else {
            this._streams = streamData.map(this.convertStream);
        }
    }

    /**
     * Converts a stream data transfer object into a stream
     * @param streamData The stream data transfer object
     */
    private convertStream(streamData: StreamData): Stream {
        return this.streamFactory(streamData);
    }

    /**
     * Get all session data transfer objects
     */
    public getStreamData(): StreamData[] {
        return this._streams.map((stream: Stream) => stream.data);
    }

    /**
     * Create a new stream
     * @param streamData The stream data transfer object
     */
    public createStream(streamData: StreamData): void {
        this._streams.push(this.convertStream(streamData));
        this.logger.info(`Created stream ${JSON.stringify(streamData)}.`);
    }
}
