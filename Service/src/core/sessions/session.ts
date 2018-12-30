import { Logger } from "../util/logger";
import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";

/**
 * Class representing a streaming session
 */
export class Session {

    /**
     * The session data transfer object
     */
    private sessionData: SessionData;

    /**
     * Get the session data transfer object
     */
    public get data(): SessionData {
        return this.sessionData;
    }

    /**
     * Get the session id
     */
    public get id(): string {
        return this.data.id;
    }

    private streams: Stream[];

    private isStarted: boolean;

    constructor(private logger: Logger, sessionEntity: SessionData, streams: Stream[]) {
        this.sessionData = sessionEntity;
        this.streams = streams;
        this.logger.debug(`Loaded session ${JSON.stringify(sessionEntity)}.`);
    }

    /**
     * Start the session
     */
    public start(): void {
        if (!this.isStarted) {
            this.logger.info(`Starting session ${this.sessionData.id}.`);
            this.streams.forEach((stream) => stream.start());
            this.isStarted = true;
        }
    }

    /**
     * Stop the session
     */
    public stop(): void {
        if (this.isStarted) {
            this.logger.info(`Stopped session ${this.sessionData.id}.`);
            this.streams.forEach((stream) => stream.stop());
            this.isStarted = false;
        }
    }
}
