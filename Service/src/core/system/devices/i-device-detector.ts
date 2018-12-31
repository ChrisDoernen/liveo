import { Device } from "./device";

/**
 * A contract for device detection
 */
export interface IDeviceDetector {

    /**
     * Get a device by id. If the id is not found, a device with device state
     * unknown device is returned.
     * @param id The id of the device
     */
    getDevice(id: string): Promise<Device>;
}
