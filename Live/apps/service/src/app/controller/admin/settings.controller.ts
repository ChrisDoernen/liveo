import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { SettingsEntity } from "@live/entities";
import { Request } from "express";
import { ROUTES } from "@live/constants";
import { SettingsService } from "../../lib/settings/settings-service";

@controller(`/${ROUTES.admin}/settings`)
export class SettingsController {
  constructor(
    @inject("SettingsService") private _setttingsService: SettingsService) {
  }

  @httpGet("/")
  public getSettings(request: Request): SettingsEntity {
    return this._setttingsService.getSettings();
  }
}