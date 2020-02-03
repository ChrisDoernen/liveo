import { DeviceType } from "./device-type";

/**
 * Class representing a device data transfer object
 */
export class DeviceEntity {
  constructor(
    public id: string,
    public streamingSourceId: string,
    public description: string,
    public deviceType: DeviceType) {
  }
}
