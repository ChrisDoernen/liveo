import { controller, httpPost } from "inversify-express-utils";
import { IShutdownService } from "../core/system/i-shutdown-service";
import { inject } from "inversify";
import { Types } from "../config/types.config";

@controller("/system")
export class SystemController {

  constructor(@inject(Types.IShutdownService) private shutdownService: IShutdownService) { }

  @httpPost("/shutdown")
  public post(): string {
    this.shutdownService.shutdown();
    return "Shutdown controller";
  }
}
