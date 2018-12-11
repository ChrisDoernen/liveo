import { controller, httpPost } from "inversify-express-utils";
import { IShutdownService } from "../core/system/shutdown/i-shutdown-service";
import { inject } from "inversify";
import { Types } from "../config/types.config";
import express = require("express");

@controller("/api/system")
export class SystemController {

  constructor(@inject(Types.IShutdownService) private shutdownService: IShutdownService) { }

  @httpPost("/shutdown")
  public shutdown(request: express.Request, response: express.Response): void {
    this.shutdownService.shutdown();
    response.sendStatus(200);
  }
}
