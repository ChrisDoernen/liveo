import { DeviceEntity } from "@liveo/entities";
import { Device } from "./device";

export type DeviceFactory = (device: DeviceEntity) => Device;

export const DeviceFactoryToken = "DeviceFactoryToken";
