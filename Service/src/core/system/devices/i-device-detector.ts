import { Device } from "./device";

/**
 * A contract for device detection
 */
export interface IDeviceDetector {

    /**
     * A list of devices available in the system
     */
    devices: Device[];
}
