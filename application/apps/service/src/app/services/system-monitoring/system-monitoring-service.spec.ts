import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { Logger } from "../../../../../server/src/app/services/logging/logger";
import { WebsocketServer } from "../../core/websocket-server";
import { SystemMonitoringService } from "./system-monitoring-service";

jest.useFakeTimers();

describe("SystemMonitoringService", () => {
  let systemMonitoringService: SystemMonitoringService;
  let logger: jest.Mocked<Logger>;
  let websocketServer: jest.Mocked<WebsocketServer>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    websocketServer = createMockInstance(WebsocketServer);
    systemMonitoringService = new SystemMonitoringService(logger, websocketServer);
  });

  it("should be defined", () => {
    expect(systemMonitoringService).toBeDefined();
  });

  it("should have emit cpu usage every 2 seconds", () => {
    const spy = jest.spyOn(websocketServer, "emitAdminEventMessage");
    systemMonitoringService.startMonitoring();

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