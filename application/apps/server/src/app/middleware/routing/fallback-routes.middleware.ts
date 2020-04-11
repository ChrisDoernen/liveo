import { ENDPOINTS, ROUTES } from "@liveo/constants";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { AppConfig } from "../../modules/core/configuration/app-config";

@Injectable()
export class FallbackRoutesMiddleware implements NestMiddleware {

  constructor(
    private readonly _appConfig: AppConfig
  ) {
  }

  public use(req: Request, res: Response, next: () => void) {
    const staticFilesBaseDirectory = this._appConfig.staticFilesBaseDirectory;

    if (req.path.includes(ENDPOINTS.api)) {
      return next();
    } else if (req.path.includes(ROUTES.admin)) {
      const adminIndex = `${staticFilesBaseDirectory}/${ROUTES.admin}/index.html`;
      res.sendFile(adminIndex);
    }

    const clientIndex = `${staticFilesBaseDirectory}/${ROUTES.client}/index.html`;
    res.sendFile(clientIndex);
  }
}