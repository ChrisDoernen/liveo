import { Logger } from "../core/util/logger";
import { CommandExecutionService } from "../core/system/command-execution-service";
import { SessionService } from "../core/sessions/session-service";
import { DataService } from "../core/data/data-service";
import { StreamService } from "../core/streams/stream-service";

export const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    IDeviceDetector: Symbol.for("IDeviceDetector"),
    Logger: Logger,
    CommandExecutionService: CommandExecutionService,
    SessionService: SessionService,
    StreamService: StreamService,
    DataService: DataService
};
