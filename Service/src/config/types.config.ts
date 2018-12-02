import { Logger } from "../core/util/logger";
import { DeviceDetector } from "../core/system/device-detector";
import { CommandExecutor } from "../core/system/command-executor";

const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    Logger: Logger,
    AudioInputDetector: DeviceDetector,
    CommandExecutionService: CommandExecutor
};

export { Types };
