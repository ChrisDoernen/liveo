import { EVENTS } from "@liveo/constants";
import { NotificationEntity, NotificationType } from "@liveo/entities";
import createMockInstance from "jest-create-mock-instance";
import { AdminGateway } from "../../gateways/admin.gateway";
import { NotificationService } from "./notification-service";

describe("NotificationService", () => {
  let adminGateway: jest.Mocked<AdminGateway>;
  let notificationService: NotificationService;

  beforeEach(() => {
    adminGateway = createMockInstance(AdminGateway);

    notificationService = new NotificationService(adminGateway);
  });

  it("should call websocket server on send notification", () => {
    const notification = new NotificationEntity("Some message", NotificationType.Info);
    notificationService.sendNotification(notification);

    expect(adminGateway.emit).toBeCalledWith(EVENTS.adminNotification, notification);
  });
});
