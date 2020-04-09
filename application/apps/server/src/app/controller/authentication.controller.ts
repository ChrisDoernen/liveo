import { ROUTES } from "@liveo/constants";
import { UserEntity } from "@liveo/entities";
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthenticationService } from "../services/authentication/authentication-service";
import { Logger } from "../services/logging/logger";

@Controller(`/${ROUTES.admin}/authentication`)
export class AuthenticationController {

  constructor(
    private _logger: Logger,
    private _authenticationService: AuthenticationService
  ) {
  }

  @Post("/")
  public authenticate(@Body() user: UserEntity, @Res() res: Response): UserEntity {
    try {
      return this._authenticationService.authenticate(user.username, user.password);
    } catch {
      this._logger.warn(`User ${user.username} could not be authenticated`);
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}
