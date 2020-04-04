import { UserEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { Logger } from "../logging/logger";
import { IUserProvider } from "./i-user-provider";

@injectable()
export class AuthenticationService {

  /* 
   * Username to user entity 
   */
  private _userCache = new Map<string, UserEntity>();

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("IUserProvider") private _userProvider: IUserProvider) {
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
