import { SessionEntity } from "@live/entities";
import { interfaces } from "inversify";
import { Logger } from "../logging/logger";
import { NotificationService } from "../notifications/notification-service";
import { Stream } from "../streams/stream";
import { Session } from "./session";

export type SessionFactory = (sessionEntity: SessionEntity, streams: Stream[]) => Session;

export const sessionFactory = (context: interfaces.Context) => (
  sessionEntity: SessionEntity, streams: Stream[]) => {
  const logger = context.container.get<Logger>("Logger");
  const notificationService = context.container.get<NotificationService>("NotificationService");

  return new Session(logger, notificationService, sessionEntity, streams);
};
