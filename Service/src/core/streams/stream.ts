import { StreamData } from "./stream-data";
import { Logger } from "../util/logger";
import { WebsocketService } from "../websocket/websocket-service";
import { CommandExecutionService } from "../system/command-execution-service";

/**
 * Class representing a live stream
 */
export class Stream {

    /**
     * The stream data transfer object
     */
    private streamData: StreamData;

    /**
     * The id of the stream
     */
    public get id(): string {
        return this.streamData.id;
    }

    /**
     * Get the stream data transfer object
     */
    public get data(): StreamData {
        return this.streamData;
    }

    public isStarted: boolean;

    constructor(private logger: Logger,
        streamData: StreamData,
        private websocketService: WebsocketService,
        private commandExecutionService: CommandExecutionService) {
        this.streamData = streamData;
        logger.debug(`Loaded stream ${JSON.stringify(streamData)}.`);
    }

    /**
     * Start the stream
     */
    public start(): void {
        if (!this.isStarted) {
            this.logger.info(`Starting stream ${this.streamData.id}.`);
            this.websocketService.addStream(this.streamData.id);
            this.commandExecutionService.spawn("ffmpeg", this.dataCallback);
            this.isStarted = true;
        }
    }

    public dataCallback(data: Buffer): void {
        this.websocketService.emit(this.streamData.id, data);
    }

    /**
     * Stop the stream
     */
    public stop(): void {
        if (this.isStarted) {
            this.logger.info(`Stopped stream ${this.streamData.id}.`);
            this.websocketService.removeStream(this.streamData.id);
            this.isStarted = false;
        }
    }
}
