import { Logger } from "../core/util/logger";
import { CommandExecutionService } from "../core/system/command-execution-service";

export const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    IDeviceDetector: Symbol.for("IDeviceDetector"),
    Logger: Logger,
    CommandExecutionService: CommandExecutionService
};
