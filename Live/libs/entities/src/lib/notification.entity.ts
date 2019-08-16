import { NotificationType } from "./notification-type";

export class NotificationEntity {
  constructor(
    public message: String,
    public type: NotificationType) {
  }
}
