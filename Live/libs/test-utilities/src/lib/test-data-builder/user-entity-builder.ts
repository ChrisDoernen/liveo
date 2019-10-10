import { UserEntity } from "@live/entities";
import * as faker from "faker";

export class UserEntityBuilder {
  private _userEntity: UserEntity;

  constructor() {
    const username = faker.random.word();
    const password = faker.random.word();
    this._userEntity = new UserEntity(username, password);
  }

  public withUsername(username: string): UserEntityBuilder {
    this._userEntity.username = username;
    return this;
  }

  public withPassword(password: string): UserEntityBuilder {
    this._userEntity.password = password;
    return this;
  }

  public build(): UserEntity {
    return this._userEntity;
  }
}