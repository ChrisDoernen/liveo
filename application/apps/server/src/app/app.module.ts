import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { FallbackRoutesMiddleware } from "./middleware/routing/fallback-routes.middleware";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { AppConfig } from "./modules/core/configuration/app-config";
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
  ],
  providers: [
    FallbackRoutesMiddleware
  ]
})
export class AppModule implements NestModule {
  constructor(
    private _appConfig: AppConfig
  ) {
  }

  public configure(consumer: MiddlewareConsumer) {
    if (this._appConfig.standalone) {
      consumer
        .apply(FallbackRoutesMiddleware)
        .forRoutes({ path: "*", method: RequestMethod.GET });
    }
  }
}
