import { inject, injectable } from "inversify";
import { SettingsService } from "../settings/settings-service";
import { ActivationService } from "./activation-service";
import { ActivationEntity } from "@live/entities";
import { Logger } from "../logging/logger";

@injectable()
export class AutoActivationService {
  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("SettingsService") private _settingsService: SettingsService,
    @inject("ActivationService") private _activationService: ActivationService) {
  }

  public performAutoActivation(): void {
    const settings = this._settingsService.getSettings();

    if (settings.enableAutoActivation) {
      try {
        const activation = new ActivationEntity(settings.defaultSession);
        this._logger.info(`Auto activation enabled, activating default session.`);
        this._activationService.setActivation(activation);
      } catch (error) {
        this._logger.error(`Auto activation failed: ${error.message}.`);
      }
    }
  }
}
