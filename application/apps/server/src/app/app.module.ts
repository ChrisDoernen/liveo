import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Config } from "./config/config";
import { config } from "./config/service.config";
import { StreamController } from "./controller/stream.controller";
import { FallbackRoutesMiddleware } from "./middleware/fallback-routes.middleware";
import { IdGenerator } from "./services/id-generation/id-generator";
import { StreamService } from "./services/streams/stream-service";
import { TimeService } from "./services/time/time.service";

@Module({
  imports: [],
  controllers: [
    AppController,
    StreamController
  ],
  providers: [
    AppService,
    StreamService,
    TimeService,
    IdGenerator,
    {
      provide: Config,
      useValue: config,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FallbackRoutesMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
