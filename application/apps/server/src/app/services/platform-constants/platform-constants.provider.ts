import { ConfigService } from "@nestjs/config";
import { AppConfig, AppConfigToken } from "../../config/configuration";
import { PlatformConstants, PLATFORM_CONSTANTS } from "./platform-constants";

export const PlatformConstantsProvider = {
  provide: PlatformConstants,
  useFactory: (
    configService: ConfigService
  ) => {
    return PLATFORM_CONSTANTS.win32;

    console.log(configService)
    const appConfig = configService.get<AppConfig>(AppConfigToken);


    // switch (appConfig.platform) {
    //   case "linux": {
    //     return PLATFORM_CONSTANTS.win32;
    //   }
    //   case "win32": {
    //     return PLATFORM_CONSTANTS.linux;
    //   }
    //   case "darwin": {
    //     return PLATFORM_CONSTANTS.darwin;
    //   }
    //   default: {
    //     throw new Error(`OS ${appConfig.platform} is unsupported.`);
    //   }
    // }
  },
  inject: [
    ConfigService
  ]
};