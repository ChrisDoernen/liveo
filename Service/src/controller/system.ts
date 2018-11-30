import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { Types } from "../config/types.config";
import { IShutdownService } from "../core/system/i-shutdown-service";

@controller("/system")
export class SystemController {

  constructor(@inject(Types.IShutdownService) private shutdownService: IShutdownService) { }

  @httpPost("/shutdown")
  public post(): string {
    this.shutdownService.shutdown();
    return "Shutdown controller";
  }
}
