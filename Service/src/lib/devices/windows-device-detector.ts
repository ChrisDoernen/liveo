import { ProcessExecutionService } from "../processes/process-execution-service";
import { IDeviceDetector } from "./i-device-detector";
import { Logger } from "../logging/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";

@injectable()
export class WindowsDeviceDetector implements IDeviceDetector {

    public devices: Device[];

    private listDevicesCommand: string = "ffmpeg -list_devices true -f dshow -i dummy -hide_banner";

    private audioDeviceRegexPattern: string = `(?<="")(.*?)(?="")`;

    constructor(@inject("Logger") private _logger: Logger,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessExecutionService) {
        this._logger.debug("Detecting audio inputs.");
        this.detectDevices();
    }

    public detectDevices(): Promise<void> {
        const response = this._processExecutionService.execute(this.listDevicesCommand);
        // const lines = response.split("\n");
        // this.devices = lines.filter((line) => this.lineContainsAudioDevice(line))
        //     .map((line) => line.match(this.audioDeviceRegexPattern)[0])
        //     .map((id) => new Device(id, ""));
        throw new Error("Not implemented");
    }

    private lineContainsAudioDevice(line: string): boolean {
        return line.includes("(") && line.includes(")") && line.includes("\"");
    }

    public getDevice(id: string): Device {
        throw new Error("Method not implemented.");
    }
}
