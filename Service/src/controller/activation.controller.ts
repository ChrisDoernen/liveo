import { controller, httpPost, httpGet, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { ActivationService } from "../lib/activation/activation-service";
import { Activation } from "../lib/activation/activation";
import { Request, Response } from "express";

@controller("/api/activation")
export class ActivationController {

    constructor(@inject("ActivationService") private _activationService: ActivationService) {
    }

    @httpPost("/")
    public activate(request: Request): void {
        const activationRequest = request.body as Activation;
        return this._activationService.setActivation(activationRequest);
    }

    @httpGet("/")
    public getActivatedSessionEntity(): Activation {
        return this._activationService.getActivation();
    }

    @httpDelete("/")
    public deactivate(request: Request, response: Response): void {
        this._activationService.deleteActivation();
        response.sendStatus(200);
    }
}
