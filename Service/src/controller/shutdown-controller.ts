import { controller, httpPost } from "inversify-express-utils";
import { IShutdownService } from "../lib/shutdown/i-shutdown-service";
import { Response } from "express";
import { inject } from "inversify";

@controller("/api/shutdown")
export class ShutdownController {

  constructor(@inject("IShutdownService") private _shutdownService: IShutdownService) { }

  @httpPost("/")
  public shutdown(response: Response): void {
    this._shutdownService.shutdown();
    response.sendStatus(200);
  }
}