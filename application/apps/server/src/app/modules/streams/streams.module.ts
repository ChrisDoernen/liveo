import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { StreamsController } from "./controller/streams.controller";
import { StreamsRepository } from "./services/streams/streams-repository";
import { StreamsService } from "./services/streams/streams.service";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    StreamsController
  ],
  providers: [
    StreamsService,
    StreamsRepository
  ]
})
export class StreamsModule { }