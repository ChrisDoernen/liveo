import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { SessionEntity } from "@liveo/entities";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SessionService } from "../services/sessions/session.service";

@Controller(`${ENDPOINTS.api}/${ROUTES.admin}/sessions`)
export class SessionsController {

  constructor(
    private readonly _sessionService: SessionService
  ) {
  }

  @Get("/")
  public getSessions(): SessionEntity[] {
    return this._sessionService.sessionEntities;
  }

  @Get(":id")
  public getSession(@Param("id") id: string): SessionEntity {
    return this._sessionService.getSessionEntity(id);
  }

  @Post("/")
  public createSession(@Body() session: SessionEntity): SessionEntity {
    return this._sessionService.createSession(session);
  }

  @Delete(":id")
  public deleteStream(@Param("id") id: string): void {
    this._sessionService.deleteSession(id);
  }
}
