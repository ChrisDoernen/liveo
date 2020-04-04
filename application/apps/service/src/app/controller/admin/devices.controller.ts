import { ROUTES } from "@liveo/constants";
import { DeviceEntity } from "@liveo/entities";
import { Request } from "express";
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
  public async getDevices(request: Request): Promise<DeviceEntity[]> {
    const redetect = request.query.refresh === "true";

    return await this._deviceService.getDeviceEntities(redetect);
  }
}
