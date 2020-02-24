import { Shutdown } from "@live/entities";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";

/**
 * Base class for live server shutdown
 */
@injectable()
export abstract class ShutdownService {

  private _shutdown: Shutdown = null;

  constructor(
    @inject("Logger") protected logger: Logger) {
  }

  public setShutdown(shutdown: Shutdown): void {
    this.logger.debug(`Receiving new shutdown: ${JSON.stringify(shutdown)}.`);
    this.executeShutdown();
  }

  public getShutdown(): Shutdown {
    return this._shutdown;
  }

  protected abstract executeShutdown(): void;

  public cancelShutdown(): void {
    if (!this._shutdown) {
      this.logger.warn("Can not cancel shutdown, no shutdown existing.");
    }

    this._shutdown = null;
    this.logger.debug("Shutdown canceled.");
  }
}
