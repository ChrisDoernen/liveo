import { StreamData } from "./stream-data";
import { Logger } from "../util/logger";
import { StreamingSource } from "./streaming-source";
import { inject } from "inversify";

/**
 * Class representing a live stream
 */
export class Stream {

    public get id(): string {
        return this._streamData.id;
    }

    public get data(): StreamData {
        return this._streamData;
    }

    private _isStarted: boolean;

    private _source: StreamingSource;

    public get hasValidSource(): boolean {
        return this._source.hasValidDevice;
    }

    constructor(@inject("Logger") private _logger: Logger,
        @inject("StreamingSourceFactory") streamingSourceFactory: (deviceId: string, stream: Stream) => StreamingSource,
        private _streamData: StreamData) {
        this._source = streamingSourceFactory(_streamData.deviceId, this);

        if (!this._source.hasValidDevice) {
            this._logger.warn(`Stream ${this.id} has invalid device and will not be startable.`);
        }

        _logger.debug(`Loaded stream ${JSON.stringify(_streamData)}.`);
    }

    public start(): void {
        if (!this._isStarted && this.hasValidSource) {
            this._source.startStreaming();
            this._logger.info(`Started stream ${this._streamData.id}.`);
            this._isStarted = true;
        }
    }

    public stop(): void {
        if (this._isStarted) {
            this._source.stopStreaming();
            this._logger.info(`Stopped stream ${this._streamData.id}.`);
            this._isStarted = false;
        }
    }
}
