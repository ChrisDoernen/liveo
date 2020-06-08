import { ENDPOINTS } from "@liveo/constants";
import { Controller, Get } from "@nestjs/common";
import { ThemeService } from "../services/theme.service";

@Controller(`${ENDPOINTS.api}/theme`)
export class ThemeController {

  constructor(
    private _themeService: ThemeService
  ) {
  }

  @Get("color")
  public getColor(): string {
    return this._themeService.getGolor();
  }
}
