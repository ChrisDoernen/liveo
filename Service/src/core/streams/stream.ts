import { StreamEntity } from "./stream-entity";
import { Logger } from "../util/logger";

/**
 * Class representing a live stream
 */
export class Stream {

    /**
     * The stream entity
     */
    public streamEntity: StreamEntity;

    public isStarted: boolean;

    constructor(private logger: Logger, streamEntity: StreamEntity) {
        this.streamEntity = streamEntity;
        logger.debug(`Loaded stream ${JSON.stringify(streamEntity)}.`);
    }

    /**
     * Start the stream
     */
    public start(): void {
        if (!this.isStarted) {
            this.logger.info(`Starting stream ${this.streamEntity.id}.`);
            this.isStarted = true;
        }
    }

    /**
     * Stop the stream
     */
    public stop(): void {
        if (this.isStarted) {
            this.logger.info(`Stopped stream ${this.streamEntity.id}.`);
            this.isStarted = false;
        }
    }
}
