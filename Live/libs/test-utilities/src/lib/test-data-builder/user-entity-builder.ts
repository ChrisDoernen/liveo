import { UserEntity } from "@live/entities";
import * as faker from "faker";

export class UserEntityBuilder {
  private _userEntity: UserEntity;

  constructor() {
    this._userEntity = new UserEntity();
    this._userEntity.username = faker.random.word();
    this._userEntity.password = faker.random.word();
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