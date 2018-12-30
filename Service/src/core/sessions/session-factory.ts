import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";
import { interfaces } from "inversify";
import { Logger } from "../util/logger";
import { Session } from "./session";
import { Types } from "../../config/types.config";

export const SessionFactory = (context: interfaces.Context) =>
    (sessionData: SessionData, streams: Stream[]) => {
        const logger = context.container.get<Logger>(Types.Logger);
        return new Session(logger, sessionData, streams);
    };
