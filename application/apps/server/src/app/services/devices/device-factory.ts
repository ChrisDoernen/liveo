import { DeviceEntity } from "@liveo/entities";
import { interfaces } from "inversify";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { IStreamingSource } from "../streaming-sources/i-streaming-source";
import { Device } from "./device";
import { DeviceState } from "./device-state";

export const DeviceFactory = (context: interfaces.Context) =>
  (deviceData: DeviceEntity, deviceState: DeviceState) => {
    const logger = context.container.get<Logger>("Logger");
    const streamingSourceFactory = context.container.get<(deviceId: string) => IStreamingSource>("StreamingSourceFactory");

    return new Device(logger, streamingSourceFactory, deviceData, deviceState);
  };
