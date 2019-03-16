import { SessionData } from "./session-data";
import { Stream } from "../streams/stream";
import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { Session } from "./session";

export const SessionFactory = (context: interfaces.Context) =>
    (sessionData: SessionData, streams: Stream[]) => {
        const logger = context.container.get<Logger>("Logger");

        return new Session(logger, sessionData, streams);
    };
