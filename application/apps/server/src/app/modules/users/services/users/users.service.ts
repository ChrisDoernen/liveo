import { UserEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { DataService } from "../../../database/services/data/data.service";

@Injectable()
export class UsersService {

  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getUser(username: string): UserEntity {
    return this._dataService.getUser(username);
  }
}
