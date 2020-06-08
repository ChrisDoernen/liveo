import { Injectable } from "@nestjs/common";
import { ThemeRepository } from "./theme-repository";

@Injectable()
export class ThemeService {

  private _defaultColor = "#ff5064";

  constructor(
    private _themeRepository: ThemeRepository
  ) {
  }

  public getGolor(): string {
    return this._themeRepository.getcolor() || this._defaultColor;
  }
}
