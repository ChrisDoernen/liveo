import { ThemeEntity } from "@liveo/entities";
import { HttpException, Injectable } from "@nestjs/common";
import { ThemeRepository } from "./theme-repository";

@Injectable()
export class ThemeService {

  private _logoCache: Buffer;
  private _colorCache: string;

  constructor(
    private _themeRepository: ThemeRepository
  ) {
  }

  public getUserTheme(): ThemeEntity {
    return this._themeRepository.getUserTheme();
  }

  public getColor(): string {
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
    const hexColorRegex = /^#[0-9a-f]{6}$/i;

    if (!theme.color.match(hexColorRegex)) {
      throw new HttpException("Invalid color, must be in hex form", 400);
    }

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
}
