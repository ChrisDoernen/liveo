import { ROUTES } from "@liveo/constants";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { Config } from "../config/config";

@Injectable()
export class FallbackRoutesMiddleware implements NestMiddleware {
  constructor(
    private readonly _config: Config) {
  }

  use(req: Request, res: Response, next: () => void) {
    if (req.path.includes(ROUTES.api)) {
      return next();
    } else if (req.path.includes(ROUTES.admin)) {
      const adminIndex = `${this._config.staticFilesBaseDirectory}/${ROUTES.admin}/index.html`;
      res.sendFile(adminIndex);
    }

    const clientIndex = `${this._config.staticFilesBaseDirectory}/${ROUTES.client}/index.html`;
    res.sendFile(clientIndex);
  }
}