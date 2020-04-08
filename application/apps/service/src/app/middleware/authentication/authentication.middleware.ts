import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Logger } from "../../../../../server/src/app/services/logging/logger";

const logger = inject("Logger");

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {

  @logger private readonly _logger: Logger;

  public async handler(request: Request, response: Response, next: NextFunction) {
    const isAuthenticated = await this.httpContext.user.isAuthenticated();
    if (!isAuthenticated) {
      this._logger.warn(`Unauthorized request to ${request.url}`)
      response.status(401).send("Unauthorized");
      return;
    }

    next();
  }
}
