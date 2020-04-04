import { ROUTES } from "@live/constants";
import { SessionEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { SessionService } from "../../services/sessions/session-service";

@controller(`/${ROUTES.admin}/sessions`, AuthenticationMiddleware)
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
    const session = this._sessionService.getSessionEntity(id);
    if (!session) {
      response.status(404).send("Session not found");
    }

    return session;
  }

  @httpPost("/")
  public createSession(request: Request): SessionEntity {
    const session = request.body as SessionEntity;

    return this._sessionService.createSession(session);
  }
  
  @httpDelete("/:id")
  public deleteStream(request: Request): void {
    const sessionId = request.params.id;
    this._sessionService.deleteSession(sessionId);
  }
}
