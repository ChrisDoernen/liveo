import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppConfigProvider } from "./configuration/app-config.provider";
import { configuration } from "./configuration/configuration";
import { Logger } from "./services/logging/logger";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "liveo.env",
      load: [configuration]
    }),
  ],
  providers: [
    AppConfigProvider,
    Logger
  ],
  exports: [
    AppConfigProvider,
    Logger
  ]
})
export class CoreModule { }
