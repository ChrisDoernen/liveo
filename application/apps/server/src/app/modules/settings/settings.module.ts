import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { SessionsModule } from "../sessions/sessions.module";
import { SettingsController } from "./controller/settings.controller";
import { SettingsProvider } from "./services/settings/settings-provider";
import { SettingsService } from "./services/settings/settings-service";

@Module({
  imports: [
    DatabaseModule,
    SessionsModule
  ],
  controllers: [
    SettingsController
  ],
  providers: [
    SettingsService,
    SettingsProvider
  ],
  exports: [
    SettingsService
  ]
})
export class SettingsModule { }