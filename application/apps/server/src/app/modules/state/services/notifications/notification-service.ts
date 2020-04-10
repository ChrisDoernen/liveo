import { EVENTS } from "@liveo/constants";
import { NotificationEntity } from "@liveo/entities";
import { Injectable } from "@nestjs/common";
import { AdminGateway } from "../../gateways/admin.gateway";

@Injectable()
export class NotificationService {
  constructor(
    private _adminGateway: AdminGateway
  ) {
  }

  public sendNotification(notification: NotificationEntity): void {
    this._adminGateway.emit(EVENTS.adminNotification, notification);
  }
}
