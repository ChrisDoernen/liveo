import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { ActivationEntity } from "@liveo/entities";
import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { ActivationService } from "../services/activation/activation-service";

@Controller(`${ENDPOINTS.api}/${ROUTES.admin}/activation`)
export class ActivationController {
  constructor(
    private readonly _activationService: ActivationService
  ) {
  }

  @Post()
  public activate(@Body() activation: ActivationEntity): ActivationEntity {
    return this._activationService.setActivation(activation);
  }

  @Get()
  public getActivation(): ActivationEntity {
    return this._activationService.getActivationEntity();
  }

  @Delete()
  public deactivate(): void {
    this._activationService.deleteActivation();
  }
}
