import { UserEntity } from "@live/entities";
import { interfaces } from "inversify-express-utils";

export class Principal implements interfaces.Principal {
  public details: any;

  private get user(): UserEntity {
    return this.details as UserEntity;
  }

  public constructor(user: UserEntity) {
    this.details = user;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.user);
  }

  public isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  public isInRole(role: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}