import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { ActivationStateEntity } from "@liveo/entities";
import { Controller, Get } from "@nestjs/common";
import { ActivationStateService } from "../services/activation-state/activation-state.service";

@Controller(`${ENDPOINTS.api}/${ROUTES.client}/application-state`)
export class ApplicationStateController {

  constructor(
    private _activationStateService: ActivationStateService
  ) {
  }

  @Get()
  public getActivationExtended(): ActivationStateEntity {
    return this._activationStateService.getActivationState();
  }
}
