import { Logger } from "../core/util/logger";
import { WindowsDeviceDetector } from "../core/system/devices/windows-device-detector";
import { CommandExecutionService } from "../core/system/command-execution-service";

const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    IDeviceDetector: Symbol.for("IDeviceDetector"),
    Logger: Logger,
    AudioInputDetector: WindowsDeviceDetector,
    CommandExecutionService: CommandExecutionService
};

export { Types };
