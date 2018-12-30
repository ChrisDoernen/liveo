
import { interfaces } from "inversify";
import { Types } from "../../config/types.config";
import { StreamData } from "./stream-data";
import { Device } from "../system/devices/device";
import { Logger } from "../util/logger";
import { Stream } from "./stream";

export const StreamFactory = (context: interfaces.Context) =>
    (streamData: StreamData, device: Device) => {
        const logger = context.container.get<Logger>(Types.Logger);
        return new Stream(logger, streamData, device);
    };
