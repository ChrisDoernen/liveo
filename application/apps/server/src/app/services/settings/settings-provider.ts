import { SettingsEntity } from "@liveo/entities";
import { DataService } from "../data/data-service";

export class SettingsProvider {

  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getSettings(): SettingsEntity {
    return this._dataService.getSettings();
  }

  public updateSettings(settings: SettingsEntity): Promise<SettingsEntity> {
    return this._dataService.updateSettings(settings);
  }
}

