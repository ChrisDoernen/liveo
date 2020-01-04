import { DeviceEntity } from "@live/entities";
import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { Device } from "./device";
import { DeviceState } from "./device-state";

export const DeviceFactory = (context: interfaces.Context) =>
  (deviceData: DeviceEntity, deviceState: DeviceState) => {
    const logger = context.container.get<Logger>("Logger");

    return new Device(logger, deviceData, deviceState);
  };
