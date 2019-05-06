import { Stream } from "../streams/stream";
import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { Session } from "./session";
import { SessionEntity } from "@live/entities";

export const SessionFactory = (context: interfaces.Context) => (
  sessionData: SessionEntity, streams: Stream[]) => {
  const logger = context.container.get<Logger>("Logger");

  return new Session(logger, sessionData, streams);
};
