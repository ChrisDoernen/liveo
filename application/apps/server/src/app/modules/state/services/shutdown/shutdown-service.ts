import { Injectable } from "@nestjs/common";
import { filter } from "rxjs/operators";
import { AppConfig } from "../../../core/configuration/app-config";
import { Logger } from "../../../core/services/logging/logger";
import { ProcessExecutionService } from "../../../shared/services/process-execution/process-execution-service";
import { ActivationStateService } from "../activation-state/activation-state.service";

/**
 * Class for server shutdown
 */
@Injectable()
export class ShutdownService {

  constructor(
    private readonly _logger: Logger,
    private readonly _appConfig: AppConfig,
    private readonly _processExecutionService: ProcessExecutionService,
    private readonly _activationStateService: ActivationStateService
  ) {
    this._activationStateService.activationState$
      .pipe(filter((activationState) => activationState.state === "Shutdown"))
      .subscribe(() => this.shutdown());
  }

  public shutdown(): void {
    this._logger.debug(`Set shutdown`);
    this.executeShutdown();
  }

  private executeShutdown(): void {
    if (!this._appConfig.production) {
      this._logger.debug("Simulating server shutdown in development environment");
      return;
    }

    if (this._appConfig.executable) {
      this._logger.info("Shutting down, killing process.");
      process.exit(0);
    }

    let shutdownCommand: string;

    switch (this._appConfig.platform) {
      case "linux": {
        shutdownCommand = "sudo shutdown -h now";
        break;
      }
      case "win32": {
        shutdownCommand = "shutdown \s";
        break;
      }
      default: {
        throw new Error(`OS ${this._appConfig.platform} is unsupported.`);
      }
    }

    this._processExecutionService.execute(shutdownCommand);
  }
}
