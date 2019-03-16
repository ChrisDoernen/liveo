import { StreamData } from "./stream-data";
import { Logger } from "../logging/logger";
import { inject } from "inversify";
import { StreamEntity } from "./stream.entity";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";
import { StreamType } from "./stream-type";

/**
 * Class representing a live stream
 */
export class Stream {

  public get id(): string {
    return this._streamData.id;
  }

  public get data(): StreamData {
    return this._streamData;
  }

  public get entity(): StreamEntity {
    return new StreamEntity(
      this.data.id,
      this.data.title,
      null,
      this.data.countryCode,
      StreamType.Audio,
      this._isStarted
    );
  }

  private _isStarted: boolean;

  private _source: IStreamingSource;

  public get hasValidDevice(): boolean {
    return this._source.hasValidDevice;
  }

  constructor(@inject("Logger") private _logger: Logger,
    @inject("StreamingSourceFactory") streamingSourceFactory: (deviceId: string, stream: Stream) => IStreamingSource,
    private _streamData: StreamData) {
    this._source = streamingSourceFactory(_streamData.deviceId, this);

    if (!this._source.hasValidDevice) {
      this._logger.warn(`Stream ${this.id} has invalid device and will not be startable.`);
    }

    _logger.debug(`Loaded stream ${JSON.stringify(_streamData)}.`);
  }

  public start(): void {
    if (this.hasValidDevice) {
      if (!this._isStarted) {
        this._source.startStreaming();
        this._logger.info(`Started stream ${this._streamData.id}.`);
        this._isStarted = true;
      } else {
        this._logger.warn(`Stream ${this.id} is already started.`);
      }
    } else {
      this._logger.warn(`Stream ${this.id} has an invalid device and can not be started.`);
    }
  }

  public stop(): void {
    if (this._isStarted) {
      this._source.stopStreaming();
      this._logger.info(`Stopped stream ${this._streamData.id}.`);
      this._isStarted = false;
    } else {
      this._logger.warn(`Stream ${this.id} is already stopped.`);
    }
  }
}
