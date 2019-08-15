import { ActivationService } from "../activation/activation.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class InitializationService {
  constructor(private _activationService: ActivationService) {

  }

  public initialize(): void {
    this._activationService.getActivation();
  }
}