import { Roles } from "./roles";

export class UserEntity {
  constructor(
    public username: string,
    public password: string,
    public roles?: Roles[]
  ) {
  }
}

