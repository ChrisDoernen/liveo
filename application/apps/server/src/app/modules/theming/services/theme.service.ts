import { HslColor, ThemeEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { hex } from "color-convert";
import { DEFAULT_THEME } from "../default-theme";
import { ThemeRepository } from "./theme-repository";

@Injectable()
export class ThemeService {

  private _logoCache: Buffer;
  private _colorCache: HslColor;

  constructor(
    private _themeRepository: ThemeRepository
  ) {
  }

  public getTheme(): ThemeEntity {
    return this._themeRepository.getTheme();
  }

  public getColor(): HslColor {
    if (this._colorCache) {
      return this._colorCache;
    }

    const colorHex = this._themeRepository.getTheme().color;

    const hsl = hex.hsl(colorHex);
    const colorHsl = new HslColor(hsl[0], hsl[1], hsl[2]);

    this._colorCache = colorHsl;

    return this._colorCache;
  }

  public getLogoAsPng(): Buffer {
    if (this._logoCache) {
      return this._logoCache;
    }

    const logoDataUrl = this._themeRepository.getTheme().logo;

    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = logoDataUrl.match(regex);
    var imageData = matches[2];

    this._logoCache = Buffer.from(imageData, 'base64');

    return this._logoCache;
  }

  public async updateTheme(theme: ThemeEntity): Promise<ThemeEntity> {
    this.clearThemeCache();

    return await this._themeRepository.updateTheme(theme);
  }

  public async resetTheme(): Promise<ThemeEntity> {
    this.clearThemeCache();

    return await this._themeRepository.updateTheme(DEFAULT_THEME);
  }

  private clearThemeCache(): void {
    this._colorCache = null;
    this._logoCache = null;
  }


}
