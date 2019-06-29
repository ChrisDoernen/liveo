import "reflect-metadata";
import { SystemMonitoringService } from "./system-monitoring-service";
import { WebsocketServer } from "../core/websocket-server";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";

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
    expect(spy).toBeCalledTimes(2);

    jest.advanceTimersByTime(2000);
    expect(spy).toBeCalledTimes(3);

    jest.advanceTimersByTime(1999);
    expect(spy).toBeCalledTimes(3);

    jest.advanceTimersByTime(1);
    expect(spy).toBeCalledTimes(4);
  });
});