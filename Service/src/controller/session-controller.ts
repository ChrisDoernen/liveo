import { Types } from "../config/types.config";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { SessionService } from "../core/sessions/session-service";
import { inject } from "inversify";
import { SessionEntity } from "../core/sessions/session-entity";
import express = require("express");

@controller("/api/sessions")
export class SessionController {

    constructor(@inject(Types.SessionService) private sessionService: SessionService) { }

    @httpGet("/")
    public getSessions(): SessionEntity[] {
        return this.sessionService.getSessionEntities();
    }

    @httpPost("/active")
    public setActiveSession(request: express.Request): SessionEntity {
        const session = request.body as SessionEntity;
        return this.sessionService.activateSession(session);
    }

    @httpGet("/active")
    public getActiveSession(): SessionEntity {
        return this.sessionService.activeSession;
    }
}
