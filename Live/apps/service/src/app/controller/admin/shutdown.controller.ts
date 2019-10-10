import { ROUTES } from "@live/constants";
import { Shutdown } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { ShutdownService } from "../../services/shutdown/shutdown-service";

@controller(`/${ROUTES.admin}/shutdown`, AuthenticationMiddleware)
export class ShutdownController {

  constructor(
    @inject("ShutdownService") private _shutdownService: ShutdownService) {
  }

  @httpPost("/")
  public setShutdown(request: Request, response: Response): Shutdown {
    const shutdown = request.body as Shutdown;
    this._shutdownService.setShutdown(shutdown);
    return shutdown;
  }

  @httpGet("/")
  public getShutdown(): Shutdown {
    return this._shutdownService.getShutdown();
  }

  @httpDelete("/")
  public cancelShutdown(request: Request, response: Response): void {
    this._shutdownService.cancelShutdown();
    response.sendStatus(200);
  }
}
