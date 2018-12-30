import { Types } from "../config/types.config";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { SessionService } from "../core/sessions/session-service";
import { inject } from "inversify";
import { SessionData } from "../core/sessions/session-data";
import express = require("express");

@controller("/api/sessions")
export class SessionController {

    constructor(@inject(Types.SessionService) private sessionService: SessionService) { }

    @httpGet("/")
    public getSessions(): SessionData[] {
        return this.sessionService.getSessionData();
    }

    @httpPost("/active")
    public setActiveSession(request: express.Request): SessionData {
        const session = request.body as SessionData;
        return this.sessionService.activateSession(session);
    }

    @httpGet("/active")
    public getActiveSession(): SessionData {
        return this.sessionService.activeSessionData;
    }

    @httpPost("/active/start")
    public startActiveSession(): void {
        this.sessionService.startActiveSession();
    }
}
