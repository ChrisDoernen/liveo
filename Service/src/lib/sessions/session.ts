import { Logger } from "../util/logger";
import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";
import { inject } from "inversify";
import { SessionEntity } from "./session.entity";

/**
 * Class representing a streaming session
 */
export class Session {

    public get data(): SessionData {
        return this._sessionData;
    }

    public get entity(): SessionEntity {
        const streamEntities = this._streams.map((stream) => stream.entity);

        return new SessionEntity(
            this._sessionData.id,
            this._sessionData.title,
            null,
            null,
            null,
            null,
            null,
            streamEntities
        );
    }

    public get id(): string {
        return this.data.id;
    }

    private isStarted: boolean;

    constructor(@inject("Logger") private _logger: Logger,
        private _sessionData: SessionData,
        private _streams: Stream[]) {
        this._logger.debug(`Loaded session ${JSON.stringify(_sessionData)}.`);
    }

    public start(): void {
        if (!this.isStarted) {
            this._logger.info(`Starting session ${this._sessionData.id}.`);
            this._streams.forEach((stream) => stream.start());
            this.isStarted = true;
        }
    }

    public stop(): void {
        if (this.isStarted) {
            this._logger.info(`Stopping session ${this._sessionData.id}.`);
            this._streams.forEach((stream) => stream.stop());
            this.isStarted = false;
        }
    }
}
