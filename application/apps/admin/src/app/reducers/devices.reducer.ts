import { Injectable } from '@angular/core';
import { DeviceEntity } from "@liveo/entities";
import { Action, State, StateContext } from '@ngxs/store';
import { DetectDevicesAction } from "../actions/devices.actions";
import { DevicesClient } from "../services/devices/devices.client";

@State<DeviceEntity[]>({
  name: "devices",
  defaults: []
})
@Injectable()
export class DevicesReducer {

  constructor(
    private readonly devicesClient: DevicesClient
  ) {
  }

  @Action(DetectDevicesAction)
  public async updateActivation(ctx: StateContext<DeviceEntity[]>, action: DetectDevicesAction) {
    const devices = await this.devicesClient.getDevices(action.redetect);
    ctx.setState(devices);
  }
}
