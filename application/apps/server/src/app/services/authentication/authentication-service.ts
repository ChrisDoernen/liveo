import { UserEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { Logger } from "../logging/logger";
import { IUserProvider } from "./i-user-provider";

@Injectable()
export class AuthenticationService {

  /* 
   * Username to user entity 
   */
  private _userCache = new Map<string, UserEntity>();

  constructor(
    private readonly _logger: Logger,
    private readonly _userProvider: IUserProvider) {
  }

  public authenticate(username: string, password: string): UserEntity {
    const user = this._userCache.get(username) || this._userProvider.getUser(username);

    if (!user || user.password !== password) {
      throw new Error("Wrong credentials, user is unauthorized.");
    } else {
      this._userCache.set(username, user);
    }

    return user;
  }
}
