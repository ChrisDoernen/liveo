import { ROUTES } from "@liveo/constants";
import { ActivationStateEntity } from "@liveo/entities";
import { Controller, Get } from "@nestjs/common";
import { ActivationStateService } from "../../services/application-state/activation-state.service";

@Controller(`/${ROUTES.client}/application-state`)
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
