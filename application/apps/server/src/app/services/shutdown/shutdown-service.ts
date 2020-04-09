import { ConfigService } from "@nestjs/config";
import { injectable } from "inversify";
import { filter } from "rxjs/operators";
import { AppConfig, APP_CONFIG_TOKEN } from "../../config/configuration";
import { ActivationStateService } from "../application-state/activation-state.service";
import { Logger } from "../logging/logger";
import { ProcessExecutionService } from "../process-execution/process-execution-service";

/**
 * Class for server shutdown
 */
@injectable()
export class ShutdownService {

  constructor(
    private readonly _logger: Logger,
    private readonly _configService: ConfigService,
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
    const appConfig = this._configService.get<AppConfig>(APP_CONFIG_TOKEN);

    if (!appConfig.production) {
      this._logger.debug("Simulating server shutdown in development environment");
      return;
    }

    if (appConfig.executable) {
      this._logger.info("Shutting down, killing process.");
      process.exit(0);
    }

    let shutdownCommand: string;

    switch (appConfig.platform) {
      case "linux": {
        shutdownCommand = "sudo shutdown -h now";
        break;
      }
      case "win32": {
        shutdownCommand = "shutdown \s";
        break;
      }
      default: {
        throw new Error(`OS ${appConfig.platform} is unsupported.`);
      }
    }

    this._processExecutionService.execute(shutdownCommand);
  }
}
