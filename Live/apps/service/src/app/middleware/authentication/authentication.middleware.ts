import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Logger } from '../../services/logging/logger';

const logger = inject("Logger");

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {

  @logger private readonly _logger: Logger;

  public async handler(req: Request, res: Response, next: NextFunction) {
    const isAuthenticated = await this.httpContext.user.isAuthenticated();
    if (!isAuthenticated) {
      res.sendStatus(401);
      this._logger.warn(`Unauthorized request to ${req.url}`)
      return;
    }

    next();
  }
}
