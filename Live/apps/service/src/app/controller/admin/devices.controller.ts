import { ROUTES } from "@live/constants";
import { DeviceEntity } from "@live/entities";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { DeviceDetector } from "../../services/devices/device-detector";

@controller(`/${ROUTES.admin}/devices`, AuthenticationMiddleware)
export class DevicesController {
  
  constructor(
    @inject("DeviceDetector") private _deviceDetector: DeviceDetector) {
  }

  @httpGet("/")
  public getDevices(): DeviceEntity[] {
    return this._deviceDetector.getDeviceEntities();
  }
}
