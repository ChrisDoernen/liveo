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

    constructor(private logger: Logger, streamEntity: StreamEntity) {
        this.streamEntity = streamEntity;
        logger.debug(`Loaded stream ${JSON.stringify(streamEntity)}.`);
    }

    /**
     * Start the stream
     */
    public start(): void {
        this.logger.info(`Starting stream ${this.streamEntity.id}.`);
    }

    /**
     * Stops the stream
     */
    public stop(): void {
        this.logger.info(`Stopped stream ${this.streamEntity.id}.`);
    }
}
