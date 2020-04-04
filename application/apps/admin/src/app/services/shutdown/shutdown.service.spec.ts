import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { ConnectionStateService } from "../connection-state/connection-state-service";
import { ShutdownService } from "./shutdown.service";

describe("ShutdownService", () => {
  let shutdownService: ShutdownService;
  let httpClient = jest.fn();
  let endpointService = jest.fn();
  let connectionStateService: ConnectionStateService;

  beforeEach(() => {
    connectionStateService = createMockInstance(ConnectionStateService);

    TestBed.configureTestingModule({
      providers: [
        ShutdownService,
        { provide: HttpClient, useValue: httpClient },
        { provide: EndpointService, useValue: endpointService },
        { provide: ConnectionStateService, useValue: connectionStateService },
        { provide: Logger, useValue: jest.fn() }
      ]
    });

    shutdownService = TestBed.get(ShutdownService);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(shutdownService).toBeTruthy();
  });
});