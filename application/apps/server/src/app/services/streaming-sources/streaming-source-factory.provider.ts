import { ConfigService } from "@nestjs/config";
import { AppConfig, AppConfigToken } from "../../config/configuration";
import { AdminGateway } from "../../gateways/admin.gateway";
import { StreamingGateway } from "../../gateways/streaming.gateway";
import { Logger } from "../logging/logger";
import { PlatformConstants } from "../platform-constants/platform-constants";
import { SettingsService } from "../settings/settings-service";
import { StreamingSource } from "./streaming-source";
import { StreamingSourceFactoryToken } from "./streaming-source-factory";

export const StreamingSourceFactoryProvider = {
  provide: StreamingSourceFactoryToken,
  useFactory(
    logger: Logger,
    configService: ConfigService,
    platformConstants: PlatformConstants,
    settingsService: SettingsService,
    adminGateway: AdminGateway,
    streamingGateway: StreamingGateway
  ) {
    return (deviceId: string, streamingId: string, onError: (error: Error) => void) => {
      const appConfig = configService.get<AppConfig>(AppConfigToken);
      const bitrate = settingsService.getSettings().bitrate;

      return new StreamingSource(logger, appConfig, null, streamingGateway, adminGateway,
        platformConstants, deviceId, streamingId, bitrate, onError);
    };
  },
  inject: [
    Logger,
    ConfigService,
    PlatformConstants,
    SettingsService,
    AdminGateway,
    StreamingGateway
  ]
}