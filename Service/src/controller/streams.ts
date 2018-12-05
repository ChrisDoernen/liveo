import { controller, httpGet } from "inversify-express-utils";
import { WindowsDeviceDetector } from "../core/system/devices/windows-device-detector";
import { inject } from "inversify";
import { Types } from "../config/types.config";

@controller("/streams")
export class StreamsController {

  constructor(@inject(Types.AudioInputDetector) private audioInputDetector: WindowsDeviceDetector) { }

  @httpGet("/")
  public get(): string {
    return "Get streams";
  }
}
