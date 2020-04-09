import { interfaces } from "inversify";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { SettingsService } from "../../../../../server/src/app/services/settings/settings-service";
import { WebsocketServer } from "../../core/websocket-server";
import { FileStreamingSource } from "./file-streaming-source";

export const FileStreamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamId: string) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const settingsService = context.container.get<SettingsService>("SettingsService");

    const bitrate = settingsService.getSettings().bitrate;

    return new FileStreamingSource(logger, ffmpegLogger, websocketServer, bitrate, deviceId, streamId);
  };
