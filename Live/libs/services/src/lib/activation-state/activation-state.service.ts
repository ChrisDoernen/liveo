import { ActivationState, ActivationEntity } from "@live/entities";
import { TimeService } from "../time/time.service";
import { Injectable } from "@angular/core";

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
      if (activation.startTime > now && (!activation.endTime || activation.endTime > now)) {
        activationState = ActivationState.Scheduled;
      } else if (activation.startTime < now && (!activation.endTime || activation.endTime > now)) {
        activationState = ActivationState.Started;
      } else if (activation.startTime < now && (!activation.endTime || activation.endTime < now)) {
        activationState = ActivationState.Ended;
      }
    } else {
      activationState = ActivationState.NoActivation;
    }

    return activationState;
  }
}
