import { EVENTS } from "@liveo/constants";
import { NotificationEntity, NotificationType } from "@liveo/entities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { WebsocketServer } from "../../core/websocket-server";
import { NotificationService } from "./notification-service";

describe("NotificationService", () => {
  let websocketServer: jest.Mocked<WebsocketServer>;
  let notificationService: NotificationService;

  beforeEach(() => {
    websocketServer = createMockInstance(WebsocketServer);

    notificationService = new NotificationService(websocketServer);
  });

  it("should call websocket server on send notification", () => {
    const notification = new NotificationEntity("Some message", NotificationType.Info);
    notificationService.sendNotification(notification);

    expect(websocketServer.emitAdminEventMessage).toBeCalledWith(EVENTS.adminNotification, notification);
  });
});
