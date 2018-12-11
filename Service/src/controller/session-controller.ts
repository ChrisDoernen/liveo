import { Types } from "../config/types.config";
import { controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { SessionService } from "../core/sessions/session-service";
import { inject } from "inversify";
import { Session } from "../core/sessions/session";
import express = require("express");

@controller("/sessions")
export class SessionController {

    constructor(@inject(Types.SessionService) private sessionService: SessionService) { }

    @httpGet("/")
    public getSessions(): Session[] {
        return this.sessionService.sessions;
    }

    @httpPost("/active")
    public setActiveSession(request: express.Request): Session {
        const session = Session.fromRequest(request.body);
        return this.sessionService.activateSession(session);
    }

    @httpGet("/active")
    public getActiveSession(): Session {
        return this.sessionService.activeSession;
    }
}
