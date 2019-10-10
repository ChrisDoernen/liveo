import { ROUTES } from "@live/constants";
import { UserEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { AuthenticationService } from "../../services/authentication/authentication-service";

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
