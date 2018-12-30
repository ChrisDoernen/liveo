import { DeviceData } from "./device-data";
import { Logger } from "../../util/logger";

/**
 * Represents either an audio or video device available in the system
 */
export class Device {

    private _deviceData: DeviceData;

    public get id(): string {
        return this._deviceData.id;
    }

    public get data(): DeviceData {
        return this._deviceData;
    }

    constructor(private logger: Logger,
        deviceData: DeviceData
    ) {
        this._deviceData = deviceData;
        this.logger.debug(`Detected device ${JSON.stringify(this._deviceData)}.`);
    }
}
