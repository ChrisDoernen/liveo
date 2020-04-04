import { UserEntity } from "@liveo/entities";

export interface IUserProvider {
  getUser(username: string): UserEntity;
}