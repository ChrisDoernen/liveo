import { Logger } from "../util/logger";
import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";
import { inject } from "inversify";
import { SessionEntity } from "./session.entity";

/**
 * Class representing a streaming session
 */
export class Session {

    private _isStarted: boolean = false;
    private _timeStarted: number = null;
    private _timeEnded: number = null;

    public get data(): SessionData {
        return this._sessionData;
    }

    public get entity(): SessionEntity {
        return new SessionEntity(
            this._sessionData.id,
            this._sessionData.title,
            null,
            this._timeStarted,
            this._timeEnded,
            this._streams.map((stream) => stream.id)
        );
    }

    public get id(): string {
        return this.data.id;
    }

    constructor(@inject("Logger") private _logger: Logger,
        private _sessionData: SessionData,
        private _streams: Stream[]) {
        this._logger.debug(`Loaded session ${JSON.stringify(_sessionData)}.`);
    }

    public start(): void {
        if (!this._isStarted) {
            this._logger.info(`Starting session ${this._sessionData.id}.`);
            this._streams.forEach((stream) => stream.start());
            this._timeStarted = Date.now();
            this._timeEnded = null;
            this._isStarted = true;
        }
    }

    public stop(): void {
        if (this._isStarted) {
            this._logger.info(`Stopping session ${this._sessionData.id}.`);
            this._streams.forEach((stream) => stream.stop());
            this._timeEnded = Date.now();
            this._isStarted = false;
        }
    }
}
