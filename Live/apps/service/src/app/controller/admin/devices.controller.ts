import { ROUTES } from "@live/constants";
import { DeviceEntity } from "@live/entities";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { AuthenticationMiddleware } from "../../middleware/authentication/authentication.middleware";
import { DeviceService } from "../../services/devices/device.service";

@controller(`/${ROUTES.admin}/devices`, AuthenticationMiddleware)
export class DevicesController {
  
  constructor(
    @inject("DeviceService") private _deviceService: DeviceService) {
  }

  @httpGet("/")
  public getDevices(): DeviceEntity[] {
    return this._deviceService.getDeviceEntities();
  }
}
