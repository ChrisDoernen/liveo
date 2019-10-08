import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
export class AuthenticationMiddleware extends BaseMiddleware {
  public async handler(req: Request, res: Response, next: NextFunction) {
    const isAuthenticated = await this.httpContext.user.isAuthenticated();
    if (!isAuthenticated) {
      res.sendStatus(401);
      return;
    }

    next();
  }
}
