import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { SessionService } from "../lib/sessions/session-service";
import { SessionData } from "../lib/sessions/session-data";
import { inject } from "inversify";
import { SessionEntity } from "../lib/sessions/session.entity";
import { Request, Response } from "express";

@controller("/api/sessions")
export class SessionController {

    constructor(@inject("SessionService") private _sessionService: SessionService) { }

    @httpGet("/")
    public getSessions(): SessionEntity[] {
        return this._sessionService.getSessionData();
    }

    @httpPost("/active")
    public setActiveSession(request: Request): SessionData {
        const session = request.body as SessionData;
        return this._sessionService.activateSession(session.id);
    }

    @httpGet("/active")
    public getActiveSessionEntity(): SessionEntity {
        return this._sessionService.activeSessionEntity;
    }

    @httpDelete("/active")
    public resetActiveSession(request: Request, response: Response): void {
        this._sessionService.resetActiveSession();
        response.sendStatus(200);
    }

    @httpPost("/active/start")
    public startActiveSession(request: Request, response: Response): void {
        this._sessionService.startActiveSession();
        response.sendStatus(200);
    }

    @httpPost("/active/stop")
    public stopActiveSession(request: Request, response: Response): void {
        this._sessionService.stopActiveSession();
        response.sendStatus(200);
    }
}