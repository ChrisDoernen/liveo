import { Logger } from "../logging/logger";
import { inject } from "inversify";
import { StreamEntity } from "@live/entities";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";

/**
 * Class representing a live stream
 */
export class Stream {
  private _source: IStreamingSource;

  public get id(): string {
    return this._streamEntity.id;
  }

  public get entity(): StreamEntity {
    return this._streamEntity;
  }

  private get isStarted(): boolean {
    return this._source.isStreaming;
  }

  public get hasValidDevice(): boolean {
    return this._source.hasValidDevice;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("StreamingSourceFactory")
    streamingSourceFactory: (deviceId: string, streamId: string, onError: (error: Error) => void) => IStreamingSource,
    private _streamEntity: StreamEntity) {
    this._source = streamingSourceFactory(_streamEntity.deviceId, this.id, this.onStreamingSourceError.bind(this));

    if (!this._source.hasValidDevice) {
      this._logger.warn(`Stream ${this.id} has invalid device and will not be startable.`);
    }

    _logger.debug(`Loaded stream ${JSON.stringify(_streamEntity)}.`);
  }

  public start(): void {
    if (this.hasValidDevice) {
      if (!this.isStarted) {
        this._source.startStreaming();
        this._logger.info(`Started stream ${this._streamEntity.id}.`);
      } else {
        this._logger.warn(`Stream ${this.id} is already started.`);
      }
    } else {
      this._logger.warn(`Stream ${this.id} has an invalid device and can not be started.`);
    }
  }

  public stop(): void {
    if (this.isStarted) {
      this._source.stopStreaming();
      this._logger.info(`Stopped stream ${this._streamEntity.id}.`);
    } else {
      this._logger.warn(`Stream ${this.id} is already stopped.`);
    }
  }

  public onStreamingSourceError(error: Error): void {
    this._logger.error(`bbbb ${error.message}`);
  }
}
