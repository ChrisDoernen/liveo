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
    public activate(request: Request): void {
        const activationRequest = request.body as ActivationRequest;
        return this._activationService.activateSession(activationRequest);
    }

    @httpGet("/")
    public getActivatedSessionEntity(): SessionEntity {
        return this._activationService.activeSessionEntity;
    }

    @httpDelete("/")
    public deactivate(request: Request, response: Response): void {
        this._activationService.deactivateSession();
        response.sendStatus(200);
    }
}
