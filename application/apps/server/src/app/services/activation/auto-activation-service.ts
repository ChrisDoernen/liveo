import { ActivationEntity } from "@liveo/entities";
import { Injectable, Logger } from "@nestjs/common";
import { SettingsService } from "../settings/settings-service";
import { ActivationService } from "./activation-service";

@Injectable()
export class AutoActivationService {

  constructor(
    private readonly _logger: Logger,
    private readonly _settingsService: SettingsService,
    private readonly _activationService: ActivationService
  ) {
  }

  public performAutoActivation(): void {
    const settings = this._settingsService.getSettings();

    if (settings.enableAutoActivation) {
      try {
        const activation = new ActivationEntity(settings.defaultSession);
        this._logger.debug(`Auto activation enabled, activating default session.`);
        this._activationService.setActivation(activation);
      } catch (error) {
        this._logger.error(`Auto activation failed: ${error.message}.`);
      }
    }
  }
}
