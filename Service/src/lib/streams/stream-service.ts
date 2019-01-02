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

    constructor(@inject("Logger") private _logger: Logger,
        @inject("DataService") private _dataService: DataService,
        @inject("StreamFactory") private streamFactory: (streamData: StreamData) => Stream) {
    }

    public async loadStreams(): Promise<void> {
        return await new Promise<void>((resolve, reject) => {
            this._logger.debug("Loading streams.");

            const streamsData = this._dataService.loadStreams();

            if (streamsData.length === 0) {
                this._logger.warn("No streams available for loading.");
            } else {
                this._streams = streamsData.map((streamData) => this.convertStream(streamData));
            }

            resolve();
        });
    }

    private convertStream(streamData: StreamData): Stream {
        return this.streamFactory(streamData);
    }

    public getStreamData(): StreamData[] {
        return this._streams.map((stream: Stream) => stream.data);
    }

    public createStream(streamData: StreamData): void {
        this._streams.push(this.convertStream(streamData));
        this._logger.info(`Created stream ${JSON.stringify(streamData)}.`);
    }
}