import { controller, httpPost, httpDelete } from "inversify-express-utils";
import { IShutdownService } from "../lib/shutdown/i-shutdown-service";
import { Request, Response } from "express";
import { inject } from "inversify";

@controller("/api/shutdown")
export class ShutdownController {

  constructor(@inject("IShutdownService") private _shutdownService: IShutdownService) { }

  @httpPost("/")
  public shutdown(request: Request, response: Response): void {
    this._shutdownService.shutdown();
    response.sendStatus(200);
  }

  @httpPost("/schedule")
  public scheduleShutdown(request: Request, response: Response): void {
    const time = request.body as Date;
    this._shutdownService.scheduleShutdown(time);
    response.sendStatus(200);
  }

  @httpDelete("/schedule")
  public unscheduleShutdown(request: Request, response: Response): void {
    this._shutdownService.unscheduleShutdown();
    response.sendStatus(200);
  }
}
