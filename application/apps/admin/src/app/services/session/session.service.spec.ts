import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { EndpointService, Logger } from "@liveo/services";
import createMockInstance from "jest-create-mock-instance";
import { ActivationService } from "../activation/activation.service";
import { SessionService } from "./session.service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let endpointService: jest.Mocked<EndpointService>;
  let activationService: jest.Mocked<ActivationService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    activationService = createMockInstance(ActivationService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SessionService,
        { provide: EndpointService, useValue: endpointService },
        { provide: ActivationService, useValue: activationService },
        { provide: Logger, useValue: createMockInstance(Logger) }
      ]
    });

    sessionService = TestBed.get(SessionService);
  });

  it("should be created", () => {
    expect(sessionService).toBeTruthy();
  });
});
