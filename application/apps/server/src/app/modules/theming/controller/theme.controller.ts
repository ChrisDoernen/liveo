import { ENDPOINTS } from "@liveo/constants";
import { ThemeEntity } from "@liveo/entities";
import { Body, Controller, Delete, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ThemeService } from "../services/theme.service";

@Controller(`${ENDPOINTS.api}/theme`)
export class ThemeController {

  constructor(
    private _themeService: ThemeService
  ) {
  }

  @Get()
  public getTheme(): ThemeEntity {
    return this._themeService.getUserTheme();
  }

  @Get("color")
  public getColor(): string {
    return this._themeService.getColor();
  }

  @Get("logo")
  public getLogo(@Res() res: Response): void {
    const logo = this._themeService.getLogoAsPng();

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': logo.length
    });

    res.end(logo);
  }

  @Post()
  public updateUserTheme(@Body() theme: ThemeEntity): Promise<ThemeEntity> {
    return this._themeService.updateUserTheme(theme);
  }

  @Delete()
  public resetUserTheme(): Promise<ThemeEntity> {
    return this._themeService.resetUserTheme();
  }
}
