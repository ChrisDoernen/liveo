import { ConnectionStateService } from "./connection-state-service";
import { TestBed, fakeAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { ConnectionState } from "./connection-state";
import { LoggerMock } from "@live/test-utilities";

describe("ConnectionStateService", () => {
  let connectionStateService: ConnectionStateService;
  let endpointService: jest.Mocked<EndpointService>;
  let httpTestingController: HttpTestingController;

  const connectionEndpoint = "connection";

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ConnectionStateService,
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useClass: LoggerMock }
      ]
    });

    connectionStateService = TestBed.get(ConnectionStateService);
    httpTestingController = TestBed.get(HttpTestingController);

    endpointService.getEndpoint.mockReturnValue(connectionEndpoint);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should construct", () => {
    expect(connectionStateService).toBeTruthy();
  });

  it("should emit correctly when online", fakeAsync(() => {
    connectionStateService.checkConnectionState("Shutdown");

    connectionStateService.connectionState$.subscribe((connectionState: ConnectionState) => {
      expect(connectionState.online).toBe(true);
      expect(connectionState.lifecycleState).toBe("Shutdown");
    });

    const req = httpTestingController.expectOne(connectionEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush("online");
  }));

  it("should emit correctly when offline", fakeAsync(() => {
    connectionStateService.checkConnectionState("Shutdown");

    connectionStateService.connectionState$.subscribe((connectionState: ConnectionState) => {
      expect(connectionState.online).toBe(false);
      expect(connectionState.lifecycleState).toBe("Shutdown");
    });

    const req = httpTestingController.expectOne(connectionEndpoint);
    expect(req.request.method).toBe("GET");
    req.error(new ErrorEvent("No connection"));
  }));
});
