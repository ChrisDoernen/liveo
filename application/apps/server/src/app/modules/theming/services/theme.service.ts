import { HslColor, ThemeEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { ThemeRepository } from "./theme-repository";

@Injectable()
export class ThemeService {

  private _logoCache: Buffer;
  private _colorCache: HslColor;

  constructor(
    private _themeRepository: ThemeRepository
  ) {
  }

  public getUserTheme(): ThemeEntity {
    return this._themeRepository.getUserTheme();
  }

  public getColor(): HslColor {
    if (this._colorCache) {
      return this._colorCache;
    }

    const color = this._themeRepository.getUserTheme().color || this._themeRepository.getDefaultTheme().color;

    this._colorCache = color;

    return this._colorCache;
  }

  public getLogoAsPng(): Buffer {
    if (this._logoCache) {
      return this._logoCache;
    }

    const logoDataUrl = this._themeRepository.getUserTheme().logo || this._themeRepository.getDefaultTheme().logo;

    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = logoDataUrl.match(regex);
    var imageData = matches[2];

    this._logoCache = Buffer.from(imageData, 'base64');

    return this._logoCache;
  }

  public async updateUserTheme(theme: ThemeEntity): Promise<ThemeEntity> {
    this.validateHslColor(theme.color);

    this.clearThemeCache();

    return await this._themeRepository.updateUserTheme(theme);
  }

  public async resetUserTheme(): Promise<ThemeEntity> {
    this.clearThemeCache();

    return await this._themeRepository.updateUserTheme(new ThemeEntity(null, null));
  }

  private clearThemeCache(): void {
    this._colorCache = null;
    this._logoCache = null;
  }

  private validateHslColor(color: HslColor): void {
    if (color.h < 0 || color.h > 360) {
      throw new Error("Hue value is valid between 0 and 360.");
    }

    if (color.l < 0 || color.l > 100) {
      throw new Error("Lightness value is valid between 0 and 100.");
    }

    if (color.s < 0 || color.s > 100) {
      throw new Error("Saturation value is valid between 0 and 100.");
    }
  }
}
