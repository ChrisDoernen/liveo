import { Logger } from "../util/logger";
import { injectable } from "inversify";
import { CommandExecutor } from "./command-executor";

@injectable()
export class DeviceDetector {

    public audioInputs: string[];

    private listDevicesCommand: string = "ffmpeg -list_devices true -f dshow -i dummy -hide_banner";

    constructor(private logger: Logger,
        private commandExecutionService: CommandExecutor) {
        this.logger.debug("Detecting audio inputs.");
        this.detectAudioInuts();
    }

    private detectAudioInuts(): void {
        const response = this.commandExecutionService.execute(this.listDevicesCommand);
    }

}
