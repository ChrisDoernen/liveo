import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EndpointService, Logger } from "@live/services";
import { LoggerMock } from "@live/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import { WebsocketService } from "../websocket/websocket.service";
import { ConnectionStateService } from "./connection-state-service";

describe("ConnectionStateService", () => {
  let connectionStateService: ConnectionStateService;
  let endpointService: jest.Mocked<EndpointService>;
  let httpTestingController: HttpTestingController;
  let websocketService: jest.Mocked<WebsocketService>;

  const connectionEndpoint = "connection";

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    websocketService = createMockInstance(WebsocketService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ConnectionStateService,
        { provide: WebsocketService, useValue: WebsocketService },
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useClass: LoggerMock }
      ]
    });

    connectionStateService = TestBed.get(ConnectionStateService);
    httpTestingController = TestBed.get(HttpTestingController);

    endpointService.getEndpoint.mockReturnValue(connectionEndpoint);
  });

  it("should construct", () => {
    expect(connectionStateService).toBeTruthy();
  });
});
