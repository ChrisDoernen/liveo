import { controller, httpPost, httpDelete, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { Shutdown } from "../lib/shutdown/shutdown";
import { ShutdownService } from "../lib/shutdown/shutdown-service";

@controller("/api/shutdown")
export class ShutdownController {

  constructor(@inject("ShutdownService") private _shutdownService: ShutdownService) { }

  @httpPost("/")
  public setShutdown(request: Request, response: Response): void {
    const shutdownRequest = request.body as Shutdown;
    this._shutdownService.setShutdown(shutdownRequest);
    response.sendStatus(200);
  }

  @httpGet("/")
  public getShutdown(): Shutdown {
    return this._shutdownService.getShutdown();
  }

  @httpDelete("/")
  public unscheduleShutdown(request: Request, response: Response): void {
    this._shutdownService.deleteShutdown();
    response.sendStatus(200);
  }
}
