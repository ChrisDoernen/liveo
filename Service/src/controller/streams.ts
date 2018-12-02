import { controller, httpGet } from "inversify-express-utils";
import { DeviceDetector } from "../core/system/device-detector";
import { inject } from "inversify";
import { Types } from "../config/types.config";

@controller("/streams")
export class StreamsController {

  constructor(@inject(Types.AudioInputDetector) private audioInputDetector: DeviceDetector) { }

  @httpGet("/")
  public get(): string {
    return "Get streams";
  }
}
