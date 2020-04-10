import { SettingsEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { Logger } from "../../../core/services/logging/logger";
import { SessionService } from "../../../sessions/services/sessions/session.service";
import { SettingsProvider } from "./settings-provider";

@Injectable()
export class SettingsService {
  constructor(
    private readonly _logger: Logger,
    private readonly _settingsProvider: SettingsProvider,
    private readonly _sessionService: SessionService
  ) {
  }

  public getSettings(): SettingsEntity {
    return this._settingsProvider.getSettings();
  }

  public async updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    this._logger.debug(`Received new settings: ${JSON.stringify(settings)}.`);
    this.validateSettings(settings);

    return await this._settingsProvider.updateSettings(settings);
  }

  private validateSettings(settings: SettingsEntity): void {
    try {
      this._sessionService.validateSessionExists(settings.defaultSession);
    } catch (error) {
      this._logger.debug(`Validation failed: ${error}.`);
    }
  }
}
