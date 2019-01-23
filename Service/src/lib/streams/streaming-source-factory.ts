import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../processes/process-execution-service";
import { StreamingSource } from "./streaming-source";
import { IDeviceDetector } from "../devices/i-device-detector";
import { WebsocketServer } from "../core/websocket-server";
import { Stream } from "./stream";
export const StreamingSourceFactory = (context: interfaces.Context) =>
    (deviceId: string, stream: Stream) => {
        const logger = context.container.get<Logger>("Logger");
        const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
        const processExecutionService = context.container.get<ProcessExecutionService>("ProcessExecutionService");
        const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
        const deviceDetector = context.container.get<IDeviceDetector>("IDeviceDetector");
        const device = deviceDetector.getDevice(deviceId);

        return new StreamingSource(logger, ffmpegLogger, websocketServer, processExecutionService, device, stream);
    };
