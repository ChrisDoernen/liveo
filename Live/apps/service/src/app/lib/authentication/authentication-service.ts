import { UserEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { DataService } from "../data/data-service";

@injectable()
export class AuthenticationService {
  constructor(
    @inject("DataService") private _dataService: DataService) {
  }

  public authenticateUser(user: UserEntity): UserEntity {
    return user;
  }
}
