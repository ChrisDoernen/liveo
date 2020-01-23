import { DeviceEntity } from "@live/entities";
import { inject, injectable } from "inversify";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ActivationService } from "../activation/activation-service";
import { AdminService } from "../admin/admin.service";
import { Device } from "./device";
import { DeviceDetector } from "./device-detector";

@injectable()
export class DeviceService {

  private _devices: Device[];

  constructor(
    @inject("ActivationService") private readonly _activationService: ActivationService,
    @inject("AdminService") private readonly _adminService: AdminService,
    @inject("DeviceDetector") private readonly _deviceDetector: DeviceDetector) {
  }

  public async initialize(): Promise<void> {
    this._devices = await this._deviceDetector.runDetection();

    const admin$ = this._adminService.adminConnected$;
    const activation$ = this._activationService.acitavtion$;
    combineLatest([admin$, activation$])
      .pipe(map(([admin, activation]) => !!admin || !!activation))
      .subscribe((shouldStream) => {
        if (shouldStream) {
          this._devices.forEach((device) => device.startStreaming());
        } else {
          this._devices.forEach((device) => device.stopStreaming());
        }
      });
  }

  public getDeviceEntities(): DeviceEntity[] {
    return this._devices.map((device) => device.entity);
  }
}
