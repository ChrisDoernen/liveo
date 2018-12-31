import { ProcessdExecutionService } from "../child-processes/process-execution-service";
import { IDeviceDetector } from "./i-device-detector";
import { Logger } from "../../util/logger";
import { injectable, inject } from "inversify";
import { Device } from "./device";
import { DeviceData } from "./device-data";
import { DeviceState } from "./device-state";

/**
 * Implementation of device detection on linux machines
 */
@injectable()
export class LinuxDeviceDetector implements IDeviceDetector {

    private _devices: Device[] = [];

    public get devices(): Device[] {
        return this._devices;
    }

    private _initialDetectionCompleted: Promise<boolean>;

    private listDevicesCommand: string = "arecord -l";

    private audioDeviceRegexPattern: RegExp = new RegExp("(card \\d+: )");

    constructor(private logger: Logger,
        private processExecutionService: ProcessdExecutionService,
        @inject("DeviceFactory") private deviceFactory: (deviceData: DeviceData, deviceState: DeviceState) => Device) {
        this._initialDetectionCompleted = this.detectDevices();
    }

    private async detectDevices(): Promise<boolean> {
        return await new Promise<boolean>((resolve, reject) => {
            this.executeListDevicesCommand().then((response) => {
                this.logger.debug("Detecting audio inputs.");

                this._devices = this.parseResponse(response);

                if (this._devices.length === 0) {
                    this.logger.warn("No devices detected. Please check your sound cards.");
                }

                resolve(true);
            });
        });
    }

    private async executeListDevicesCommand(): Promise<string> {
        return await new Promise<string>((resolve, reject) => {
            this.processExecutionService.execute(this.listDevicesCommand, (error, stdout, stderr) => {
                resolve(stdout);
            });
        });
    }

    private parseResponse(response: string): Device[] {
        const lines = response.split("\n");

        return lines
            .filter((line) => this.audioDeviceRegexPattern.test(line))
            .map((line) => this.parseDevice(line));
    }

    private parseDevice(line: string): Device {
        const cardPrefix = line.match(this.audioDeviceRegexPattern)[0];
        const id = cardPrefix.match(new RegExp("\\d+")).toString();
        const description = line.slice(cardPrefix.length);

        return this.deviceFactory(new DeviceData(id, description), DeviceState.Available);
    }

    public async getDevice(id: string): Promise<Device> {
        return new Promise<Device>((resolve, reject) => {
            this._initialDetectionCompleted.then(() => {
                const matchingDevice = this._devices.find((device) => device.id === id);
                resolve(matchingDevice ? matchingDevice : this.deviceFactory(new DeviceData(id, ""), DeviceState.UnknownDevice));
            });
        });
    }
}
