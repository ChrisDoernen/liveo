import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { ClientInfoBuilder } from "../../../../test-utilities/test-data-builder/client-info-builder";
import { Logger } from "../../../core/services/logging/logger";
import { TimeService } from "../../../shared/services/time/time.service";
import { ConnectionHistoryService } from "./connection-history-service";

describe("ConnectionHistoryService", () => {
  let connectionHistoryService: ConnectionHistoryService;
  let logger: jest.Mocked<Logger>;
  let timeService: jest.Mocked<TimeService>;

  beforeEach(() => {
    logger = createMockInstance(Logger);
    timeService = createMockInstance(TimeService);

    timeService.now.mockImplementation(() => new Date());
  });

  it("should construct", () => {
    expect(connectionHistoryService).toBeTruthy();
  });

  it("should count connections correctly on connection and disconnection", () => {
    const firstClientInfo = new ClientInfoBuilder().withIpAdress("1").build();

    connectionHistoryService.clientConnected(firstClientInfo);
    expect(connectionHistoryService.connectionCounter).toBe(1);

    connectionHistoryService.clientDisconnected(firstClientInfo);
    expect(connectionHistoryService.connectionCounter).toBe(0);
  });

  it("should count listeners correctly on subscription and unsubscription", () => {
    const firstClientInfo = new ClientInfoBuilder().withIpAdress("1").withStreamId("1bg4").build();

    connectionHistoryService.clientSubscribed(firstClientInfo);
    expect(connectionHistoryService.listeningCounter).toBe(1);

    connectionHistoryService.clientUnsubscribed(firstClientInfo);
    expect(connectionHistoryService.listeningCounter).toBe(0);
  });

  it("should count listeners correctly on subscription and disconnection", () => {
    const firstClientInfo = new ClientInfoBuilder().withIpAdress("1").withStreamId("1bg4").build();

    connectionHistoryService.clientSubscribed(firstClientInfo);
    expect(connectionHistoryService.listeningCounter).toBe(1);

    connectionHistoryService.clientDisconnected(firstClientInfo);
    expect(connectionHistoryService.listeningCounter).toBe(0);
  });
});