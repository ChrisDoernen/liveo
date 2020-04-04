import { Injectable } from "@angular/core";
import { ActivationEntity, ActivationState } from "@liveo/entities";
import { TimeService } from "../time/time.service";

@Injectable({
  providedIn: "root"
})
export class ActivationStateService {

  constructor(
    private _timeService: TimeService) {
  }

  public determineActivationState(activation: ActivationEntity): ActivationState {
    let activationState: ActivationState;
    const now = this._timeService.now();

    if (activation) {
      if (new Date(activation.startTime) > now && (!activation.endTime || new Date(activation.endTime) > now)) {
        activationState = "Scheduled";
      } else if (new Date(activation.startTime) < now && (!activation.endTime || new Date(activation.endTime) > now)) {
        activationState = "Started";
      } else if (new Date(activation.startTime) < now && (!activation.endTime || new Date(activation.endTime) < now)) {
        activationState = "Ended";
      }
    } else {
      activationState = "NoActivation";
    }

    return activationState;
  }
}
