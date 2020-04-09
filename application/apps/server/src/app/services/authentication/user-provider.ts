import { UserEntity } from "@liveo/entities";
import { DataService } from "../data/data-service";

export class UserProvider {

  constructor(
    private readonly _dataService: DataService
  ) {
  }

  public getUser(username: string): UserEntity {
    return this._dataService.getUser(username);
  }
}