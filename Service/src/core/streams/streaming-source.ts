import { Logger } from "../util/logger";
import { ProcessdExecutionService } from "../system/child-processes/process-execution-service";
import { injectable } from "inversify";
import { Device } from "../system/devices/device";

/**
 * Class responsible for opening a child process and passing the data to the websocket server
 */
@injectable()
export class StreamingSource {

    private device: Device;

    constructor(private logger: Logger,
        private processExecutionService: ProcessdExecutionService,
        device: Device) {
    }

    public startStreaming(): void {
        this.processExecutionService.spawn("command");
    }

    public stopStreaming(): void {

    }
}
