import { Logger } from "../core/util/logger";

const Types = {
    IShutdownService: Symbol.for("IShutdownService"),
    Logger: Logger
};

export { Types };
