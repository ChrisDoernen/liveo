import { ROUTES } from "@live/constants";
import { SettingsEntity } from "@live/entities";
import { Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPut } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { SettingsService } from "../../services/settings/settings-service";

@controller(`/${ROUTES.admin}/settings`, AuthenticationMiddleware)
export class SettingsController {

  constructor(
    @inject("SettingsService") private _settingsService: SettingsService) {
  }

  @httpGet("/")
  public getSettings(request: Request): SettingsEntity {
    return this._settingsService.getSettings();
  }

  @httpPut("/", AuthenticationMiddleware)
  public async putSettings(request: Request): Promise<SettingsEntity> {
    return await this._settingsService.updateSettings(request.body as SettingsEntity);
  }
}