import { ConfigService } from "@nestjs/config";
import { AppConfig, APP_CONFIG_TOKEN } from "../../config/configuration";
import { PlatformConstants, PLATFORM_CONSTANTS } from "./platform-constants";

export const PlatformConstantsFactory = {
  provide: PlatformConstants,
  useFactory: (configService: ConfigService) => {
    const appConfig = configService.get<AppConfig>(APP_CONFIG_TOKEN);

    switch (appConfig.platform) {
      case "linux": {
        return PLATFORM_CONSTANTS.win32;
      }
      case "win32": {
        return PLATFORM_CONSTANTS.linux;
      }
      case "darwin": {
        return PLATFORM_CONSTANTS.darwin;
      }
      default: {
        throw new Error(`OS ${appConfig.platform} is unsupported.`);
      }
    }
  },
  inject: [
    ConfigService
  ]
};