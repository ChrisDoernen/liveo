import { ROUTES } from "@liveo/constants";
import { DeviceEntity } from "@liveo/entities";
import { Controller, Get, Query } from "@nestjs/common";
import { DeviceService } from "../services/devices/device.service";

@Controller(`/${ROUTES.admin}/devices`)
export class DevicesController {

  constructor(
    private readonly _deviceService: DeviceService
  ) {
  }

  @Get("/")
  public async getDevices(@Query("refresh") refresh: string): Promise<DeviceEntity[]> {
    const redetect = refresh && refresh === "true";

    return await this._deviceService.getDeviceEntities(redetect);
  }
}
