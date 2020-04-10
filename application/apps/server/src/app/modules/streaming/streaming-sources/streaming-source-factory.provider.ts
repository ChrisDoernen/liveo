import { ConfigService } from "@nestjs/config";
import { AdminGateway } from "../../../gateways/admin.gateway";
import { AppConfig, AppConfigToken } from "../../core/configuration/app-config";
import { Logger } from "../../core/services/logging/logger";
import { SettingsService } from "../../settings/services/settings/settings-service";
import { PlatformConstants } from "../../shared/platform-constants/platform-constants";
import { StreamingGateway } from "../gateways/streaming.gateway";
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