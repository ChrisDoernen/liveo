import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { HslColor, ThemeEntity } from "@liveo/entities";
import { Body, Controller, Delete, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ThemeService } from "../services/theme.service";

@Controller(ENDPOINTS.api)
export class ThemeController {

  constructor(
    private _themeService: ThemeService
  ) {
  }

  @Get(`${ROUTES.admin}/theme`)
  public getTheme(): ThemeEntity {
    return this._themeService.getUserTheme();
  }

  @Get(`${ROUTES.client}/theme/color`)
  public getColor(): HslColor {
    return this._themeService.getColor();
  }

  @Get(`${ROUTES.client}/theme/logo`)
  public getLogo(@Res() res: Response): void {
    const logo = this._themeService.getLogoAsPng();

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': logo.length
    });

    res.end(logo);
  }

  @Post(`${ROUTES.admin}/theme`)
  public updateUserTheme(@Body() theme: ThemeEntity): Promise<ThemeEntity> {
    return this._themeService.updateUserTheme(theme);
  }

  @Delete(`${ROUTES.admin}/theme`)
  public resetUserTheme(): Promise<ThemeEntity> {
    return this._themeService.resetUserTheme();
  }
}
