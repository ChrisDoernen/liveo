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
        this.detectDevices();
    }

    private detectDevices(): void {
        this.executeListDevicesCommand().then((res) => {
            this.logger.debug("Detecting audio inputs.");

            this.parseResponse(res);

            if (!this.devices || !this.devices.some) {
                this.logger.warn("No devices detected. Please check your sound cards.");
            }
        });
    }

    private parseResponse(res: string): void {
        const lines = res.split("\n");
        this.devices = lines.filter((line) => this.audioDeviceRegexPattern.test(line))
            .map((line) => this.getDevice(line));
    }

    private executeListDevicesCommand(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.commandExecutionService.execute(this.listDevicesCommand, (error, stdout, stderr) => {
                resolve(stdout);
            });
        });
    }

    private getDevice(line: string): Device {
        const cardPrefix = line.match(this.audioDeviceRegexPattern)[0];
        const id = cardPrefix.match(new RegExp("\\d+")).toString();
        const description = line.slice(cardPrefix.length);

        this.logger.debug(`Detected device ${description} with id ${id}.`);

        return new Device(id, description);
    }
}
