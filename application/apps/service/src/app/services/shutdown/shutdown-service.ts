import { inject, injectable } from "inversify";
import { filter } from "rxjs/operators";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";

/**
 * Base class for live server shutdown
 */
@injectable()
export abstract class ShutdownService {

  constructor(
    @inject("Logger") protected logger: Logger,
    @inject("ActivationStateService") private readonly _activationStateService: ActivationStateService) {
    this._activationStateService.activationState$
      .pipe(filter((activationState) => activationState.state === "Shutdown"))
      .subscribe(() => this.shutdown());
  }

  public shutdown(): void {
    this.logger.debug(`Set shutdown`);
    this.executeShutdown();
  }

  protected abstract executeShutdown(): void;
}
