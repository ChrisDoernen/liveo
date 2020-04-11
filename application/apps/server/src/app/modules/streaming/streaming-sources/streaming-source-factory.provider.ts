import { AppConfig } from "../../core/configuration/app-config";
import { Logger } from "../../core/services/logging/logger";
import { SettingsService } from "../../settings/services/settings/settings-service";
import { PlatformConstants } from "../../shared/platform-constants/platform-constants";
import { AdminGateway } from "../../state/gateways/admin.gateway";
import { StreamingGateway } from "../gateways/streaming.gateway";
import { FFmpegLogger } from "../services/ffmpeg-logger";
import { StreamingSource } from "./streaming-source";
import { StreamingSourceFactoryToken } from "./streaming-source-factory";

export const StreamingSourceFactoryProvider = {
  provide: StreamingSourceFactoryToken,
  useFactory(
    logger: Logger,
    appConfig: AppConfig,
    platformConstants: PlatformConstants,
    settingsService: SettingsService,
    adminGateway: AdminGateway,
    streamingGateway: StreamingGateway,
    ffmpegLogger: FFmpegLogger
  ) {
    return (deviceId: string, streamingId: string, onError: (error: Error) => void) => {
      const bitrate = settingsService.getSettings().bitrate;

      return new StreamingSource(logger, appConfig, ffmpegLogger, streamingGateway, adminGateway,
        platformConstants, deviceId, streamingId, bitrate, onError);
    };
  },
  inject: [
    Logger,
    AppConfig,
    PlatformConstants,
    SettingsService,
    AdminGateway,
    StreamingGateway,
    FFmpegLogger
  ]
}