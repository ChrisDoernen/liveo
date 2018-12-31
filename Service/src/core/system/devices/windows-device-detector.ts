import { ProcessdExecutionService } from "../child-processes/process-execution-service";
import { IDeviceDetector } from "./i-device-detector";
import { Logger } from "../../util/logger";
import { injectable } from "inversify";
import { Device } from "./device";

@injectable()
export class WindowsDeviceDetector implements IDeviceDetector {

    public devices: Device[];

    private listDevicesCommand: string = "ffmpeg -list_devices true -f dshow -i dummy -hide_banner";

    private audioDeviceRegexPattern: string = `(?<="")(.*?)(?="")`;

    constructor(private logger: Logger,
        private commandExecutionService: ProcessdExecutionService) {
        this.logger.debug("Detecting audio inputs.");
        this.detectDevices();
    }

    private detectDevices(): void {
        const response = this.commandExecutionService.execute(this.listDevicesCommand);
        // const lines = response.split("\n");
        // this.devices = lines.filter((line) => this.lineContainsAudioDevice(line))
        //     .map((line) => line.match(this.audioDeviceRegexPattern)[0])
        //     .map((id) => new Device(id, ""));
    }

    private lineContainsAudioDevice(line: string): boolean {
        return line.includes("(") && line.includes(")") && line.includes("\"");
    }

    public getDevice(id: string): Device {
        throw new Error("Method not implemented.");
    }
}
