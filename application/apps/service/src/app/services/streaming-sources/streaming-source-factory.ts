import { interfaces } from "inversify";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { PlatformConstants } from "../../../../../server/src/app/services/platform-constants/platform-constants";
import { SettingsService } from "../../../../../server/src/app/services/settings/settings-service";
import { WebsocketServer } from "../../core/websocket-server";
import { IStreamingSource } from "./i-streaming-source";
import { StreamingSource } from "./streaming-source";

export type StreamingSourceFactory = (deviceId: string, streamingSourceId: string, onError: (error: Error) => void) => IStreamingSource;

export const streamingSourceFactory = (context: interfaces.Context) =>
  (deviceId: string, streamingId: string, onError: (error: Error) => void) => {
    const logger = context.container.get<Logger>("Logger");
    const ffmpegLogger = context.container.get<Logger>("FfmpegLogger");
    const websocketServer = context.container.get<WebsocketServer>("WebsocketServer");
    const plattformConstants = context.container.get<PlatformConstants>("PlattformConstants");
    const settingsService = context.container.get<SettingsService>("SettingsService");

    const bitrate = settingsService.getSettings().bitrate;

    return new StreamingSource(logger, ffmpegLogger, websocketServer, plattformConstants, deviceId, streamingId, bitrate, onError);
  };
