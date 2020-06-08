import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { CoreModule } from "./modules/core/core.module";
import { DevicesModule } from "./modules/devices/devices.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { StateModule } from "./modules/state/state.module";
import { StatisticsModule } from "./modules/statistics/statistics.module";
import { StreamingModule } from "./modules/streaming/streaming.module";
import { StreamsModule } from "./modules/streams/streams.module";

@Module({
  imports: [
    AuthenticationModule,
    CoreModule,
    DevicesModule,
    SessionsModule,
    SettingsModule,
    StateModule,
    StatisticsModule,
    StreamingModule,
    StreamsModule
  ]
})
export class AppModule {}
