import { DeviceEntity } from "@live/entities";
import { inject } from "inversify";
import { Logger } from "../logging/logger";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";
import { DeviceState } from "./device-state";

/**
 * Represents a device in the system
 */
export class Device {
  private _source: IStreamingSource;

  public get entity(): DeviceEntity {
    return this._deviceData;
  }

  public get state(): DeviceState {
    return this._deviceState;
  }

  public get id(): string {
    return this._deviceData.id;
  }

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("StreamingSourceFactory") streamingSourceFactory: (deviceId: string, streamingSourceId: string, onError: (error: Error) => void) => IStreamingSource,
    private _deviceData: DeviceEntity,
    private _deviceState: DeviceState) {
    this._source = streamingSourceFactory(this.id, this.entity.streamingId, this.onStreamingSourceError.bind(this));

    if (this._deviceState === DeviceState.Available) {
      this._logger.debug(`Detected device ${JSON.stringify(this._deviceData)}.`);
    }

    if (this._deviceState === DeviceState.UnknownDevice) {
      this._logger.warn(`Device with id ${this._deviceData.id} was not detected in the system`);
    }
  }

  public startStreaming(): void {
    if (this._deviceState === DeviceState.Available) {
        this._source.startStreaming();
        this._deviceState = DeviceState.InUse;
    } else {
      this._logger.warn(`Device ${this.id} is not available for streaming`);
    }
  }

  public stopStreaming(): void {
    if (this._deviceState === DeviceState.InUse) {
      this._source.stopStreaming();
      this._deviceState = DeviceState.Available;
    } else {
      this._logger.warn(`Device ${this.id} already stopped streaming`);
    }
  }

  public onStreamingSourceError(error: Error): void {
    this._logger.error(`Streaming source error: ${error.message}`);
    this._deviceState = DeviceState.Available;
  }
}
