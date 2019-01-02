import { interfaces } from "inversify";
import { Logger } from "../util/logger";
import { ProcessdExecutionService } from "../child-processes/process-execution-service";
import { StreamingSource } from "./streaming-source";
import { IDeviceDetector } from "../devices/i-device-detector";

export const StreamingSourceFactory = (context: interfaces.Context) =>
    (deviceId: string) => {
        const logger = context.container.get<Logger>("Logger");
        const processExecutionService = context.container.get<ProcessdExecutionService>("ProcessExecutionService");
        const deviceDetector = context.container.get<IDeviceDetector>("IDeviceDetector");
        const device = deviceDetector.getDevice(deviceId);

        return new StreamingSource(logger, processExecutionService, device);
    };
