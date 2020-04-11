import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { SettingsEntity } from "@liveo/entities";
import { Body, Controller, Get, Put } from "@nestjs/common";
import { SettingsService } from "../services/settings/settings-service";

@Controller(`${ENDPOINTS.api}/${ROUTES.admin}/settings`)
export class SettingsController {

  constructor(
    private readonly _settingsService: SettingsService
  ) {
  }

  @Get()
  public getSettings(): SettingsEntity {
    return this._settingsService.getSettings();
  }

  @Put()
  public async putSettings(@Body() settings: SettingsEntity): Promise<SettingsEntity> {
    return await this._settingsService.updateSettings(settings);
  }
}