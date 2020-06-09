import { ThemeEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { DataService } from "../../database/services/data/data.service";

@Injectable()
export class ThemeRepository {

  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getTheme(): ThemeEntity {
    return this._dataService.getTheme();
  }

  public async updateTheme(theme: ThemeEntity): Promise<ThemeEntity> {
    return await this._dataService.updateTheme(theme);
  }
}
