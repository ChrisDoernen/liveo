import { controller, httpPost } from "inversify-express-utils";
import { ROUTES } from "@live/constants";
import { Request, Response } from "express";
import { AuthenticationService } from "../../lib/authentication/authentication-service";
import { UserEntity } from "@live/entities";
import { inject } from "inversify";

@controller(`/${ROUTES.admin}/authentication`)
export class AuthenticationController {

  constructor(
    @inject("AuthenticationService") private _authenticationService: AuthenticationService) {
  }

  @httpPost("/")
  public authenticate(request: Request, response: Response): UserEntity {
    const user = request.body as UserEntity;
    return this._authenticationService.authenticateUser(user);
  }
}
