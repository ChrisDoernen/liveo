import { StreamData } from "./stream-data";
import { Logger } from "../util/logger";
import { WebsocketService } from "../websocket/websocket-service";
import { StreamingSource } from "./streaming-source";
import { inject } from "inversify";

/**
 * Class representing a live stream
 */
export class Stream {

    private streamData: StreamData;

    public get id(): string {
        return this.streamData.id;
    }

    public get data(): StreamData {
        return this.streamData;
    }

    private isStarted: boolean;

    private source: StreamingSource;

    constructor(private logger: Logger,
        private websocketService: WebsocketService,
        @inject("StreamingSourceFactory") streamingSourceFactory: (deviceId: string) => StreamingSource,
        streamData: StreamData) {
        this.streamData = streamData;
        this.source = streamingSourceFactory(streamData.deviceId);
        logger.debug(`Loaded stream ${JSON.stringify(streamData)}.`);
    }

    public start(): void {
        if (!this.isStarted) {
            this.websocketService.addStream(this.id);
            this.source.startStreaming();
            this.logger.info(`Started stream ${this.streamData.id}.`);
            this.isStarted = true;
        }
    }

    public stop(): void {
        if (this.isStarted) {
            this.websocketService.removeStream(this.id);
            this.source.stopStreaming();
            this.logger.info(`Stopped stream ${this.streamData.id}.`);
            this.isStarted = false;
        }
    }
}
