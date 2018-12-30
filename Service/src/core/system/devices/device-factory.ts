import { DeviceData } from "./device-data";
import { Logger } from "../../util/logger";
import { Types } from "../../../config/types.config";
import { interfaces } from "inversify";
import { Device } from "./device";

export const DeviceFactory = (context: interfaces.Context) =>
    (deviceData: DeviceData) => {
        const logger = context.container.get<Logger>(Types.Logger);
        return new Device(logger, deviceData);
    };
