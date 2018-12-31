import { Device } from "./device";

/**
 * A contract for device detection
 */
export interface IDeviceDetector {

    /**
     * Get a device by id. Returnes a device without data and device state
     * unknown device if the id is not found.
     * @param id The id of the device
     */
    getDevice(id: string): Device;
}
