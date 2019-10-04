import { controller, httpPost, httpDelete, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { Shutdown } from "@live/entities";
import { ShutdownService } from "../../lib/shutdown/shutdown-service";
import { ROUTES } from "@live/constants";

@controller(`/${ROUTES.admin}/shutdown`)
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
