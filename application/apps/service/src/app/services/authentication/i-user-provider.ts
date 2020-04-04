import { UserEntity } from "@live/entities";

export interface IUserProvider {
  getUser(username: string): UserEntity;
}