import { Logger } from "../core/util/logger";
import { DeviceDetector } from "../core/system/device-detector";
import { CommandExecutionService } from "../core/system/command-execution-service";

const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    Logger: Logger,
    AudioInputDetector: DeviceDetector,
    CommandExecutionService: CommandExecutionService
};

export { Types };
