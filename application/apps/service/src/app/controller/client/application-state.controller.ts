import { ROUTES } from "@liveo/constants";
import { ActivationStateEntity } from "@liveo/entities";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { ActivationStateService } from "../../services/application-state/activation-state.service";

@controller(`/${ROUTES.client}/application-state`)
export class ApplicationStateController {

  constructor(
    @inject("ActivationStateService") private _activationStateService: ActivationStateService) {
  }

  @httpGet("/")
  public getActivationExtended(): ActivationStateEntity {
    return this._activationStateService.getActivationState();
  }
}
