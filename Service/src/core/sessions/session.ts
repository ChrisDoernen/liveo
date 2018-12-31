import { Logger } from "../util/logger";
import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";

/**
 * Class representing a streaming session
 */
export class Session {

    private sessionData: SessionData;

    public get data(): SessionData {
        return this.sessionData;
    }

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

    public start(): void {
        if (!this.isStarted) {
            this.logger.info(`Starting session ${this.sessionData.id}.`);
            this.streams.forEach((stream) => stream.start());
            this.isStarted = true;
        }
    }

    public stop(): void {
        if (this.isStarted) {
            this.logger.info(`Stopped session ${this.sessionData.id}.`);
            this.streams.forEach((stream) => stream.stop());
            this.isStarted = false;
        }
    }
}
