import { Injectable } from "@nestjs/common";
import { DataService } from "../../database/services/data/data.service";

@Injectable()
export class ThemeRepository {
  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getcolor(): string {
    return this._dataService.getThemeColor();
  }
}
