import { Logger } from "../util/logger";
import { SessionEntity } from "./session-entity";
import { Stream } from "../streams/stream";

/**
 * Class representing a streaming session
 */
export class Session {

    /**
     * The session entity
     */
    public sessionEntity: SessionEntity;

    private streams: Stream[];

    constructor(private logger: Logger, sessionEntity: SessionEntity, streams: Stream[]) {
        this.sessionEntity = sessionEntity;
        this.streams = streams;
        this.logger.debug(`Loaded session ${JSON.stringify(sessionEntity)}.`);
    }

    /**
     * Start the session
     */
    public start(): void {
        this.logger.info(`Starting session ${this.sessionEntity.id}.`);
    }

    /**
     * Stops the session
     */
    public stop(): void {
        this.logger.info(`Stopped session ${this.sessionEntity.id}.`);
    }
}
