import { Logger } from "../logging/logger";
import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";
import { inject } from "inversify";
import { SessionEntity } from "@live/entities";

/**
 * Class representing a streaming session
 */
export class Session {
  private _isStarted: boolean = false;
  private _timeStarted: number = null;
  private _timeEnded: number = null;

  /**
   * Indicates wether at least one stream of the session
   * has a valid device and can be started.
   */
  private _hasValidStream: boolean = false;

  public get hasValidStreams(): boolean {
    return this._hasValidStream;
  }

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
      this._streams.map(stream => stream.id)
    );
  }

  public get id(): string {
    return this.data.id;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    private _sessionData: SessionData,
    private _streams: Stream[]
  ) {
    this._logger.debug(`Loaded session ${JSON.stringify(_sessionData)}.`);
    this.checkStreamDevices();
  }

  private checkStreamDevices(): void {
    this._hasValidStream = false;

    for (const stream of this._streams) {
      if (stream.hasValidDevice) {
        this._hasValidStream = true;
        return;
      }
    }

    this._logger.warn(
      `All streams of session ${
      this.id
      } have invalid devices. Session can not be activated.`
    );
  }

  public start(): void {
    if (!this._isStarted) {
      if (!this._hasValidStream) {
        throw new Error(
          `Cannot start session ${this.id}: All streams have invalid devices.`
        );
      }

      this._logger.info(`Starting session ${this.id}.`);
      this._streams.forEach(stream => stream.start());
      this._timeStarted = Date.now();
      this._timeEnded = null;
      this._isStarted = true;
    }
  }

  public stop(): void {
    if (this._isStarted) {
      this._logger.info(`Stopping session ${this.id}.`);
      this._streams.forEach(stream => stream.stop());
      this._timeEnded = Date.now();
      this._isStarted = false;
    }
  }
}
