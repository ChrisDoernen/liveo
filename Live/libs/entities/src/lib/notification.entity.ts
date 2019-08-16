import { NotificationType } from "./notification-type";

export class NotificationEntity {
  constructor(
    public message: string,
    public type: NotificationType) {
  }
}
