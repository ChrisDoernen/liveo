import { Injectable } from "@angular/core";
import { ActivationEntity } from "@live/entities";
import { ActivationService } from "../activation/activation.service";
import { SessionService } from "@live/services";

@Injectable({
  providedIn: "root"
})
export class ActivationStateService {
  public activation: ActivationEntity;

  constructor(
    private _activationService: ActivationService,
    private _sessionService: SessionService) {
  }

  public async getActivationState(): Promise<void> {
    const activation = await this._activationService.getActivation();


  }
}