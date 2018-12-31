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

    constructor(private logger: Logger,
        private dataService: DataService,
        @inject("StreamFactory") private streamFactory: (streamData: StreamData) => Stream) {
        this.loadStreams();
    }

    private loadStreams(): void {
        this.logger.debug("Loading streams.");

        const streamsData = this.dataService.loadStreams();

        if (streamsData.length === 0) {
            this.logger.warn("No streams available for loading.");
        } else {
            this._streams = streamsData.map((streamData) => this.convertStream(streamData));
        }
    }

    private convertStream(streamData: StreamData): Stream {
        return this.streamFactory(streamData);
    }

    public getStreamData(): StreamData[] {
        return this._streams.map((stream: Stream) => stream.data);
    }

    public createStream(streamData: StreamData): void {
        this._streams.push(this.convertStream(streamData));
        this.logger.info(`Created stream ${JSON.stringify(streamData)}.`);
    }
}
