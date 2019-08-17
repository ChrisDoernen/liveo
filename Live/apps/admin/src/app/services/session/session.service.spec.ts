import { TestBed } from "@angular/core/testing";
import { SessionService } from "./session.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import createMockInstance from "jest-create-mock-instance";
import { EndpointService } from "@live/services";
import { ActivationService } from "../activation/activation.service";

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
        { provide: ActivationService, useValue: activationService }
      ]
    });

    sessionService = TestBed.get(SessionService);
  });

  it("should be created", () => {
    expect(sessionService).toBeTruthy();
  });
});
