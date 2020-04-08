import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { config, CONFIG_INJECTION_TOKEN } from "./config/service.config";
import { StreamController } from "./controller/stream.controller";
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
      provide: CONFIG_INJECTION_TOKEN,
      useValue: config,
    }
  ],
})
export class AppModule { }
