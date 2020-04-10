import { DeviceEntity, DeviceType } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { AdminService } from "apps/server/src/app/services/admin/admin.service";
import { ActivationStateService } from "apps/server/src/app/services/application-state/activation-state.service";
import { combineLatest } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Logger } from "../../../core/services/logging/logger";
import { Device } from "../../device/device";
import { DeviceDetector } from "../device-detection/device-detector";

@Injectable()
export class DeviceService {

  private _devices: Device[] = [];

  constructor(
    private readonly _logger: Logger,
    private readonly _activationStateService: ActivationStateService,
    private readonly _adminService: AdminService,
    private readonly _deviceDetector: DeviceDetector
  ) {
  }

  public async initialize(): Promise<void> {
    this._devices = await this.detectDevices();

    const activationState$ = this._activationStateService.activationState$;
    const streamCreation$ = this._adminService.streamCreation;

    combineLatest([activationState$, streamCreation$])
      .pipe(
        map(([activationState, streamCreation]) => {
          if (activationState.state !== "NoActivation") {
            return activationState.streams.map((stream) => stream.streamingId);
          } else if (streamCreation) {
            return this._devices.map((device) => device.entity.streamingId);
          } else {
            return null;
          }
        }),
        distinctUntilChanged()
      ).subscribe((streamingIds) => {
        if (streamingIds) {
          this._devices
            .filter((device) => this.isAudioDevice(device))
            .filter((device) => !!streamingIds.find((streamingId) => streamingId === device.entity.streamingId))
            .forEach((device) => device.startStreaming());
        } else {
          this._devices.forEach((device) => device.stopStreaming());
        }
      });
  }

  private async detectDevices(): Promise<Device[]> {
    return await this._deviceDetector.runDetection();
  }

  public async getDeviceEntities(redetect: boolean = false): Promise<DeviceEntity[]> {
    if (redetect) {
      const devices = await this.detectDevices();

      // Find new devices, start them
      const existingDeviceIds = this._devices.map((device) => device.id);
      const newDevices = devices.filter((device) => !existingDeviceIds.find((id) => id === device.id));
      const newAudioDevices = newDevices.filter((device) => this.isAudioDevice(device));
      newAudioDevices.forEach((device) => device.startStreaming());
      this._devices.push(...newDevices);
    }

    return this._devices
      .filter((device) => this.isAudioDevice(device))
      .map((device) => device.entity);
  }

  private isAudioDevice(device: Device): boolean {
    return device.entity.deviceType === DeviceType.Audio
  }
}
