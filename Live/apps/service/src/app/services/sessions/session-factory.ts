import { Stream } from "../streams/stream";
import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { Session } from "./session";
import { SessionEntity } from "@live/entities";
import { NotificationService } from "../notifications/notification-service";

export const SessionFactory = (context: interfaces.Context) => (
  sessionEntity: SessionEntity, streams: Stream[]) => {
  const logger = context.container.get<Logger>("Logger");
  const notificationService = context.container.get<NotificationService>("NotificationService");

  return new Session(logger, notificationService, sessionEntity, streams);
};
