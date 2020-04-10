import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { SessionsController } from "./controller/sessions.controller";
import { SessionRepository } from "./services/sessions/session-repository";
import { SessionService } from "./services/sessions/session.service";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    SessionsController
  ],
  providers: [
    SessionService,
    SessionRepository
  ],
  exports: [
    SessionService
  ]
})
export class SessionsModule { }