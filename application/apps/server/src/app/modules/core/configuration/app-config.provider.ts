import { ConfigService } from "@nestjs/config";
import { AppConfig } from "./app-config";

export const AppConfigProvider = {
  provide: AppConfig,
  useFactory(
    configService: ConfigService
  ) {
    return configService.get<AppConfig>("appConfig");
  },
  inject: [
    ConfigService
  ]
}