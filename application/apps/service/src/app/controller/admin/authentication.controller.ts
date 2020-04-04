import { ROUTES } from "@live/constants";
import { UserEntity } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { AuthenticationService } from "../../services/authentication/authentication-service";
import { Logger } from "../../services/logging/logger";

@controller(`/${ROUTES.admin}/authentication`)
export class AuthenticationController {

  constructor(
    @inject("Logger") private _logger: Logger,
    @inject("AuthenticationService") private _authenticationService: AuthenticationService) {
  }

  @httpPost("/")
  public authenticate(request: Request, response: Response): UserEntity {
    const user = request.body as UserEntity;
    try {
      return this._authenticationService.authenticate(user.username, user.password);
    } catch {
      this._logger.warn(`User ${user.username} could not be authenticated`);
      response.status(403).send("Unauthorized");
    }
  }
}
