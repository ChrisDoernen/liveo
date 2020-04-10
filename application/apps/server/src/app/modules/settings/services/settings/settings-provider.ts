import { SettingsEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { DataService } from "../../../database/services/data/data.service";

@Injectable()
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
