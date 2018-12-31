import { StreamData } from "./stream-data";
import { Logger } from "../util/logger";
import { WebsocketService } from "../websocket/websocket-service";
import { StreamingSource } from "./streaming-source";
import { inject } from "inversify";

/**
 * Class representing a live stream
 */
export class Stream {

    private _streamData: StreamData;

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

    constructor(private logger: Logger,
        private websocketService: WebsocketService,
        @inject("StreamingSourceFactory") streamingSourceFactory: (deviceId: string) => StreamingSource,
        streamData: StreamData) {
        this._streamData = streamData;
        this._source = streamingSourceFactory(streamData.deviceId);
        logger.debug(`Loaded stream ${JSON.stringify(streamData)}.`);
    }

    public start(): void {
        if (!this._isStarted && this.hasValidSource) {
            this.websocketService.addStream(this.id);
            this._source.startStreaming();
            this.logger.info(`Started stream ${this._streamData.id}.`);
            this._isStarted = true;
        }
    }

    public stop(): void {
        if (this._isStarted) {
            this.websocketService.removeStream(this.id);
            this._source.stopStreaming();
            this.logger.info(`Stopped stream ${this._streamData.id}.`);
            this._isStarted = false;
        }
    }
}
