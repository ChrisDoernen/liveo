import { interfaces } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";
import { AudioSystem } from "../audio-system/audio-system";
import { DeviceDetector } from "../devices/device-detector";
import { Logger } from "../logging/logger";
import { SettingsService } from "../settings/settings-service";
import { StreamingSource } from "./streaming-source";

export const StreamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamId: string, onError: (error: Error) => void) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const deviceDetector = context.container.get<DeviceDetector>("DeviceDetector");
    const audioSystem = context.container.get<AudioSystem>("AudioSystem");
    const settingsService = context.container.get<SettingsService>("SettingsService");

    const device = deviceDetector.getDevice(deviceId);
    const bitrate = settingsService.getSettings().bitrate;

    return new StreamingSource(logger, ffmpegLogger, websocketServer, audioSystem, bitrate, device, streamId, onError);
  };
