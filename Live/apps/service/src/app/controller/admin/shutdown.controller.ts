import { ROUTES } from "@live/constants";
import { Shutdown } from "@live/entities";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { ShutdownService } from "../../services/shutdown/shutdown-service";

@controller(`/${ROUTES.admin}/shutdown`)
export class ShutdownController extends BaseHttpController {

  constructor(
    @inject("ShutdownService") private _shutdownService: ShutdownService) {
    super();
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
