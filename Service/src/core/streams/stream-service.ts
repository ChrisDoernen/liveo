import { Logger } from "../util/logger";
import { injectable, inject } from "inversify";
import { StreamData } from "./stream-data";
import { DataService } from "../data/data-service";
import { Stream } from "./stream";
import { IDeviceDetector } from "../system/devices/i-device-detector";
import { Device } from "../system/devices/device";
import { DeviceState } from "../system/devices/device-state";

/**
 * A class providing methods to manage streams
 */
@injectable()
export class StreamService {

    private _streams: Stream[];

    public get streams(): Stream[] {
        return this._streams;
    }

    constructor(private logger: Logger,
        private dataService: DataService,
        private deviceDetector: IDeviceDetector,
        @inject("StreamFactory") private streamFactory: (streamData: StreamData, device: Device) => Stream) {
        this.loadStreams();
    }

    private loadStreams(): void {
        this.logger.debug("Loading streams.");

        const streamsData = this.dataService.loadStreams();

        if (streamsData.length === 0) {
            this.logger.warn("No streams available for loading.");
        } else {
            this._streams = streamsData.map((streamData) => this.convertStream(streamData));
        }
    }

    private convertStream(streamData: StreamData): Stream {
        const id = streamData.deviceId;
        const device = this.deviceDetector.getDevice(id);

        if (device.state === DeviceState.UnknownDevice) {
            this.logger.warn(`No device with id ${id} was found for stream ${streamData.id}.`);
        }

        return this.streamFactory(streamData, device);
    }

    public getStreamData(): StreamData[] {
        return this._streams.map((stream: Stream) => stream.data);
    }

    public createStream(streamData: StreamData): void {
        this._streams.push(this.convertStream(streamData));
        this.logger.info(`Created stream ${JSON.stringify(streamData)}.`);
    }
}
