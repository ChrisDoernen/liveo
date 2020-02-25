import { ROUTES } from "@live/constants";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { ShutdownService } from "../../services/shutdown/shutdown-service";

@controller(`/${ROUTES.admin}/shutdown`, AuthenticationMiddleware)
export class ShutdownController {

  constructor(
    @inject("ShutdownService") private _shutdownService: ShutdownService) {
  }

  @httpPost("/")
  public setShutdown(): void {
    this._shutdownService.shutdown();
  }
}
