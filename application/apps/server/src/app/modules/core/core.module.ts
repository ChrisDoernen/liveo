import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    Logger,
    ConfigService
  ],
  exports: [
    Logger,
    ConfigService
  ]
})
export class CoreModule { }
