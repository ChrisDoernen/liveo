import { controller, httpPost, httpGet, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { ActivationService } from "../lib/activation/activation-service";
import { ActivationRequest } from "../lib/activation/activation-request";
import { SessionEntity } from "../lib/sessions/session.entity";
import { Request, Response } from "express";

@controller("/api/activation")
export class ActivationController {

    constructor(@inject("ActivationService") private _activationService: ActivationService) {
    }

    @httpPost("/")
    public setActiveSession(request: Request): void {
        const activationRequest = request.body as ActivationRequest;
        return this._activationService.activateSession(activationRequest);
    }

    @httpGet("/")
    public getActiveSessionEntity(): SessionEntity {
        return this._activationService.activeSessionEntity;
    }

    @httpDelete("/")
    public resetActiveSession(request: Request, response: Response): void {
        this._activationService.resetActiveSession();
        response.sendStatus(200);
    }
}
