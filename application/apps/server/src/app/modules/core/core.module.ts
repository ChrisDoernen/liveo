import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "./services/logging/logger";

@Global()
@Module({
  providers: [
    Logger
  ],
  exports: [
    Logger,
    ConfigService
  ]
})
export class CoreModule { }
