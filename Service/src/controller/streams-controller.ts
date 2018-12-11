import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { Types } from "../config/types.config";
import { IDeviceDetector } from "../core/system/devices/i-device-detector";

@controller("/api/streams")
export class StreamsController {

  constructor(@inject(Types.IDeviceDetector) private audioInputDetector: IDeviceDetector) { }

  @httpGet("/")
  public getStreams(): string {
    return "Get streams";
  }
}
