import { interfaces } from "inversify";
import { WebsocketServer } from "../../core/websocket-server";
import { Logger } from "../logging/logger";
import { PlatformConstants } from "../platform-constants/i-platform-constants";
import { SettingsService } from "../settings/settings-service";
import { StreamingSource } from "./streaming-source";

export const StreamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamingId: string, onError: (error: Error) => void) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const plattformConstants = context.container.get<PlatformConstants>("PlattformConstants");
    const settingsService = context.container.get<SettingsService>("SettingsService");

    const bitrate = settingsService.getSettings().bitrate;

    return new StreamingSource(logger, ffmpegLogger, websocketServer, plattformConstants, deviceId, streamingId, bitrate, onError);
  };
