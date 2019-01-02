import { DeviceData } from "./device-data";
import { Logger } from "../../util/logger";
import { DeviceState } from "./device-state";
import { inject } from "inversify";

/**
 * Represents a device in the system
 */
export class Device {

    public get data(): DeviceData {
        return this._deviceData;
    }

    public get state(): DeviceState {
        return this._deviceState;
    }

    public get id(): string {
        return this._deviceData.id;
    }

    constructor(@inject("Logger") private _logger: Logger,
        private _deviceData: DeviceData,
        private _deviceState: DeviceState) {
        if (this._deviceState === DeviceState.Available) {
            this._logger.debug(`Detected device ${JSON.stringify(this._deviceData)}.`);
        }

        if (this._deviceState === DeviceState.UnknownDevice) {
            this._logger.warn(`Device with id ${this._deviceData.id} was not detected in the system.`);
        }
    }
}
