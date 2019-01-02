import { controller, httpPost } from "inversify-express-utils";
import { IShutdownService } from "../lib/shutdown/i-shutdown-service";
import express = require("express");
import { inject } from "inversify";

@controller("/api/system")
export class SystemController {

  constructor(@inject("IShutdownService") private _shutdownService: IShutdownService) { }

  @httpPost("/shutdown")
  public shutdown(request: express.Request, response: express.Response): void {
    this._shutdownService.shutdown();
    response.sendStatus(200);
  }
}
