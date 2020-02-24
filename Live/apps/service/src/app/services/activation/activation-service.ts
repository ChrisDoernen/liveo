import { ActivationEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { BehaviorSubject } from "rxjs";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { TimeService } from "../time/time.service";

@injectable()
export class ActivationService {

  private _activation: ActivationEntity;
  public activation$ = new BehaviorSubject<ActivationEntity>(null);

  constructor(
    @inject("Logger") private readonly _logger: Logger,
    @inject("TimeService") private readonly _timeService: TimeService,
    @inject("ActivationStateService") private readonly _activationStateService: ActivationStateService) {
  }

  public setActivation(activation: ActivationEntity): ActivationEntity {
    this._logger.info(`Received new activation: ${JSON.stringify(activation)}.`);

    if (this._activation) {
      throw new Error("Can not set new activation before deleting the current.");
    }

    this.validateActivation(activation);

    this._activation = activation;
    this._activationStateService.newActivation(activation);
    this._logger.debug("Activation set");

    return this._activation;
  }

  private validateActivation(activation: ActivationEntity): void {
    if (!activation.sessionId) {
      throw new Error("Activation validation error: Session id is null.");
    }

    if (activation.startTime && new Date(activation.startTime) < this._timeService.now()) {
      throw new Error("Activation validation error: The start time is not in the future.");
    }

    if (activation.endTime && new Date(activation.endTime) < new Date(activation.startTime)) {
      throw new Error("Activation validation error: Time ending is lower than time starting.");
    }

    if (activation.shutdownTime && new Date(activation.shutdownTime) < new Date(activation.endTime)) {
      throw new Error("Activation validation error: Time server shutdown is lower than time ending.");
    }
  }

  public deleteActivation(): ActivationEntity {
    if (!this._activation) {
      throw new Error("Can not delete activation, no activation existing.");
    }

    this._activationStateService.deleteActivation(this._activation);
    this._activation = null;
    this._logger.debug("Activation deleted");

    return this._activation;
  }

  public getActivationEntity(): ActivationEntity {
    return this._activation;
  }
}
