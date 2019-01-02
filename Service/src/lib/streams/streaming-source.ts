import { Logger } from "../util/logger";
import { ProcessdExecutionService } from "../processes/process-execution-service";
import { injectable, inject } from "inversify";
import { Device } from "../devices/device";
import { DeviceState } from "../devices/device-state";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {

    constructor(@inject("Logger") private _logger: Logger,
        @inject("ProcessExecutionService") private _processExecutionService: ProcessdExecutionService,
        private _device: Device) {
    }

    public get hasValidDevice(): boolean {
        return this._device.state !== DeviceState.UnknownDevice;
    }

    public startStreaming(): void {
        this._processExecutionService.spawn("command");
    }

    public stopStreaming(): void {
        //
    }
}
