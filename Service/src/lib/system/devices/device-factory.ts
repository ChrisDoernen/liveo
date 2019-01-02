import { DeviceData } from "./device-data";
import { Logger } from "../../util/logger";
import { interfaces } from "inversify";
import { Device } from "./device";
import { DeviceState } from "./device-state";

export const DeviceFactory = (context: interfaces.Context) =>
    (deviceData: DeviceData, deviceState: DeviceState) => {
        const logger = context.container.get<Logger>("Logger");

        return new Device(logger, deviceData, deviceState);
    };
