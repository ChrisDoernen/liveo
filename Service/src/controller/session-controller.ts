import { controller, httpGet, httpPost } from "inversify-express-utils";
import { SessionService } from "../lib/sessions/session-service";
import { SessionData } from "../lib/sessions/session-data";
import express = require("express");
import { inject } from "inversify";

@controller("/api/sessions")
export class SessionController {

    constructor(@inject("SessionService") private _sessionService: SessionService) { }

    @httpGet("/")
    public getSessions(): SessionData[] {
        return this._sessionService.getSessionData();
    }

    @httpPost("/active")
    public setActiveSession(request: express.Request): SessionData {
        const session = request.body as SessionData;
        return this._sessionService.activateSession(session.id);
    }

    @httpGet("/active")
    public getActiveSessionData(): SessionData {
        return this._sessionService.activeSessionData;
    }

    @httpPost("/active/start")
    public startActiveSession(): void {
        this._sessionService.startActiveSession();
    }

    @httpPost("/active/stop")
    public stopActiveSession(): void {
        this._sessionService.stopActiveSession();
    }
}
