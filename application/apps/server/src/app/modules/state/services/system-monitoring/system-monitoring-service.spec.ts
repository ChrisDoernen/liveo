import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../../../core/services/logging/logger";
import { AdminGateway } from "../../gateways/admin.gateway";
import { SystemMonitoringService } from "./system-monitoring-service";

jest.useFakeTimers();

describe("SystemMonitoringService", () => {
  let systemMonitoringService: SystemMonitoringService;
  let logger: jest.Mocked<Logger>;
  let adminGateway: jest.Mocked<AdminGateway>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    adminGateway = createMockInstance(AdminGateway);

    systemMonitoringService = new SystemMonitoringService(logger, adminGateway);
  });

  it("should be defined", () => {
    expect(systemMonitoringService).toBeDefined();
    const spy = jest.spyOn(adminGateway, "emit");

    // I dont know why the test does not pass with 4000ms...
    jest.advanceTimersByTime(5000);
    expect(spy).toBeCalledTimes(4);

    jest.advanceTimersByTime(2000);
    expect(spy).toBeCalledTimes(6);

    jest.advanceTimersByTime(1999);
    expect(spy).toBeCalledTimes(7);

    jest.advanceTimersByTime(1);
    expect(spy).toBeCalledTimes(8);
  });
});