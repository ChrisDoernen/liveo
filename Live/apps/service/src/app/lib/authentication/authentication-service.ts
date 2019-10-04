import { injectable } from "inversify";
import { UserEntity } from "@live/entities";

@injectable()
export class AuthenticationService {
  public authenticateUser(user: UserEntity): UserEntity {
    return user;
  }
}
