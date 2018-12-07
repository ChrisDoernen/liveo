import { CommandExecutionService } from "../command-execution-service";
import { IDeviceDetector } from "./i-device-detector";
import { Logger } from "../../util/logger";
import { injectable } from "inversify";
import { Device } from "./device";

/**
 * Implementation of device detection on linux machines
 */
@injectable()
export class LinuxDeviceDetector implements IDeviceDetector {

    public devices: Device[];

    private listDevicesCommand: string = "arecord -l";

    private audioDeviceRegexPattern: RegExp = new RegExp("(card \\d+: )");

    constructor(private logger: Logger,
        private commandExecutionService: CommandExecutionService) {
        this.logger.debug("Detecting audio inputs.");

        this.detectDevices();

        if (this.devices.some) {
            this.logger.info(`Devices detected: ${this.devices.join(", ")}.`);
        } else {
            this.logger.warn("No devices detected. Please check your sound cards.");
        }
    }

    private detectDevices(): void {
        const response = this.commandExecutionService.executeWithResponse(this.listDevicesCommand);
        const lines = response.split("\n");
        this.devices =
            lines.filter((line) => this.audioDeviceRegexPattern.test(line))
                .map((line) => this.parseDevice(line));
    }

    private parseDevice(line: string): Device {
        const cardPrefix = line.match(this.audioDeviceRegexPattern)[0];
        const id = cardPrefix.match(new RegExp("\\d+")).toString();
        const description = line.slice(cardPrefix.length);

        return new Device(id, description);
    }
}
