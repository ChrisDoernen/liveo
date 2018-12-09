import { Logger } from "../core/util/logger";
import { CommandExecutionService } from "../core/system/command-execution-service";
import { SessionService } from "../core/sessions/session-service";

export const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    IDeviceDetector: Symbol.for("IDeviceDetector"),
    Logger: Logger,
    CommandExecutionService: CommandExecutionService,
    SessionService: SessionService
};
