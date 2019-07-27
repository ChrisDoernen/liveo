import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { DeviceDetector } from "../devices/device-detector";
import { WebsocketServer } from "../core/websocket-server";
import { FileStreamingSource } from "./file-streaming-source";

export const FileStreamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamId: string) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const deviceDetector = context.container.get<DeviceDetector>("DeviceDetector");
    const device = deviceDetector.getDevice(deviceId);

    return new FileStreamingSource(logger, ffmpegLogger, websocketServer, device, streamId);
  };
