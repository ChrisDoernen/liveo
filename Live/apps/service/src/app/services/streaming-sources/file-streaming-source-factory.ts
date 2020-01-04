import { interfaces } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";
import { DeviceDetector } from "../devices/device-detector";
import { Logger } from "../logging/logger";
import { SettingsService } from "../settings/settings-service";
import { FileStreamingSource } from "./file-streaming-source";

export const FileStreamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamId: string) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const deviceDetector = context.container.get<DeviceDetector>("DeviceDetector");
    const settingsService = context.container.get<SettingsService>("SettingsService");

    const device = deviceDetector.getDevice(deviceId);
    const bitrate = settingsService.getSettings().bitrate;

    return new FileStreamingSource(logger, ffmpegLogger, websocketServer, bitrate, device, streamId);
  };
