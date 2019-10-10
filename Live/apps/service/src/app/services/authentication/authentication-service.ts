import { UserEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { DataService } from "../data/data-service";
import { Logger } from "../logging/logger";

@injectable()
export class AuthenticationService {
  private _userCache = [];

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("DataService") private _dataService: DataService) {
  }

  public authenticateUser(userToAuthenticate: UserEntity): UserEntity {
    const users = this._dataService.getUsers();

    const matchingUser = users.find((user) => user.username === userToAuthenticate.username);

    if (!matchingUser || matchingUser.password !== userToAuthenticate.password) {
      this._logger.warn(`User ${userToAuthenticate.username} could not be authenticated.`);
      throw new Error("Error authenticating user.");
    }

    this._userCache.push(matchingUser);
    return matchingUser;
  }

  public getUser(userToAuthenticate: UserEntity): UserEntity {
    const matchingUser = this._userCache.find((user) => user.username === userToAuthenticate.username);

    if (!matchingUser || matchingUser.password !== userToAuthenticate.password) {
      throw new Error("Wrong credentials, user is unauthorized.");
    }

    return matchingUser;
  }
}
