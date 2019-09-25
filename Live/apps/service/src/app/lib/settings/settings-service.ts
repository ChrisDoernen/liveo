import { injectable, inject } from "inversify";
import { Logger } from "../logging/logger";
import { SettingsEntity } from "@live/entities";
import { ISettingsProvider } from "./i-settings-provider";

@injectable()
export class SettingsService {
  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("ISettingsProvider") private _settingsProvider: ISettingsProvider) {
  }

  public getSettings(): SettingsEntity {
    return this._settingsProvider.getSettings();
  }

  public async updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    this._logger.info(`Received new settings: ${JSON.stringify(settings)}.`);

    return await this._settingsProvider.updateSettings(settings);
  }
}
