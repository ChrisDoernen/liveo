import { DeviceType } from "./device-type";

/**
 * Class representing a device data transfer object
 */
export class DeviceData {
  constructor(
    public id: string,
    public description: string,
    public deviceType: DeviceType) {
  }
}
