import { ROUTES } from "@live/constants";
import { ActivationEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { ActivationService } from "../../services/activation/activation-service";

@controller(`/${ROUTES.admin}/activation`, AuthenticationMiddleware)
export class ActivationController {
  constructor(
    @inject("ActivationService") private _activationService: ActivationService) {
  }

  @httpPost("/", AuthenticationMiddleware)
  public activate(request: Request): ActivationEntity {
    const activationRequest = request.body as ActivationEntity;
    return this._activationService.setActivation(activationRequest);
  }

  @httpGet("/")
  public getActivation(): ActivationEntity {
    return this._activationService.getActivationEntity();
  }

  @httpDelete("/", AuthenticationMiddleware)
  public deactivate(request: Request, response: Response): void {
    this._activationService.deleteActivation();
  }
}
