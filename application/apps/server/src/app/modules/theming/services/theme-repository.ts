import { ThemeEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { DataService } from "../../database/services/data/data.service";

@Injectable()
export class ThemeRepository {
  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getDefaultTheme(): ThemeEntity {
    return this._dataService.getDefaultTheme();
  }

  public getUserTheme(): ThemeEntity {
    return this._dataService.getUserTheme();
  }

  public async updateUserTheme(theme: ThemeEntity): Promise<ThemeEntity> {
    return await this._dataService.updateUserTheme(theme);
  }
}
