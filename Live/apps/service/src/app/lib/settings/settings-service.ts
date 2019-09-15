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
}
