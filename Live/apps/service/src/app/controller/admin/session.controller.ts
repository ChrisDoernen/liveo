import { ROUTES } from "@live/constants";
import { SessionEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { SessionService } from "../../services/sessions/session-service";

@controller(`/${ROUTES.admin}/sessions`)
export class SessionController {
  constructor(
    @inject("SessionService") private _sessionService: SessionService) {
  }

  @httpGet("/")
  public getSessions(): SessionEntity[] {
    return this._sessionService.sessionEntities;
  }

  @httpGet("/:id")
  public getSession(request: Request, response: Response): SessionEntity {
    const id = request.params.id;
    return this._sessionService.getSessionEntity(id);
  }
}
