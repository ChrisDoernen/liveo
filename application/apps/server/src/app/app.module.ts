import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configuration } from "./config/configuration";
import { StreamsController } from "./controller/streams.controller";
import { FallbackRoutesMiddleware } from "./middleware/fallback-routes.middleware";
import { DataService } from "./services/data/data-service";
import { IdGenerator } from "./services/id-generation/id-generator";
import { Logger } from "./services/logging/logger";
import { SessionRepository } from "./services/sessions/session-repository";
import { SessionService } from "./services/sessions/session-service";
import { SettingsProvider } from "./services/settings/settings-provider";
import { SettingsService } from "./services/settings/settings-service";
import { StreamRepository } from "./services/streams/stream-repository";
import { StreamService } from "./services/streams/stream-service";
import { TimeService } from "./services/time/time.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "liveo.env",
      load: [configuration]
    })
  ],
  controllers: [
    AppController,
    StreamsController
  ],
  providers: [
    AppService,
    DataService,
    StreamService,
    StreamRepository,
    SessionService,
    SessionRepository,
    SettingsService,
    SettingsProvider,
    TimeService,
    IdGenerator,
    Logger
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FallbackRoutesMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
