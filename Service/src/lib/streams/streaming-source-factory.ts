import { interfaces } from "inversify";
import { Types } from "../../config/types.config";
import { Logger } from "../util/logger";
import { ProcessdExecutionService } from "../system/child-processes/process-execution-service";
import { StreamingSource } from "./streaming-source";
import { IDeviceDetector } from "../system/devices/i-device-detector";

export const StreamingSourceFactory = (context: interfaces.Context) =>
    (deviceId: string) => {
        const logger = context.container.get<Logger>(Types.Logger);
        const processExecutionService = context.container.get<ProcessdExecutionService>(Types.ProcessExecutionService);
        const deviceDetector = context.container.get<IDeviceDetector>(Types.IDeviceDetector);
        const device = deviceDetector.getDevice(deviceId);

        return new StreamingSource(logger, processExecutionService, device);
    };
