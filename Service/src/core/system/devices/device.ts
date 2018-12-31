import { DeviceData } from "./device-data";
import { Logger } from "../../util/logger";
import { DeviceState } from "./device-state";

/**
 * Represents a device in the system
 */
export class Device {

    private _deviceData: DeviceData;

    public get data(): DeviceData {
        return this._deviceData;
    }

    private _deviceState: DeviceState;

    public get state(): DeviceState {
        return this._deviceState;
    }

    public get id(): string {
        return this._deviceData.id;
    }

    constructor(private logger: Logger,
        deviceData: DeviceData,
        deviceState: DeviceState
    ) {
        this._deviceData = deviceData;
        this._deviceState = deviceState;

        if (deviceState === DeviceState.Available) {
            this.logger.debug(`Detected device ${JSON.stringify(this._deviceData)}.`);
        }

        if (deviceState === DeviceState.UnknownDevice) {
            this.logger.debug(`Detected device ${JSON.stringify(this._deviceData)}.`);
        }
    }
}
