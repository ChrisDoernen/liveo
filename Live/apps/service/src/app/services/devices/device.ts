import { DeviceEntity } from "@live/entities";
import { inject } from "inversify";
import { Logger } from "../logging/logger";
import { DeviceState } from "./device-state";

/**
 * Represents a device in the system
 */
export class Device {

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
    private _deviceData: DeviceEntity,
    private _deviceState: DeviceState) {
    if (this._deviceState === DeviceState.Available) {
      this._logger.debug(`Detected device ${JSON.stringify(this._deviceData)}.`);
    }

    if (this._deviceState === DeviceState.UnknownDevice) {
      this._logger.warn(`Device with id ${this._deviceData.id} was not detected in the system.`);
    }
  }
}
