import { TestBed, fakeAsync } from "@angular/core/testing";
import { ActivationService } from "./activation.service";
import { EndpointService, ActivationStateService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ActivationEntity } from "@live/entities";
import { ActivationEntityBuilder, LoggerMock } from "@live/test-utilities";

describe("ActivationService", () => {
  let activationService: ActivationService;
  let endpointService: jest.Mocked<EndpointService>;
  let activationStateService: jest.Mocked<ActivationStateService>;
  let httpTestingController: HttpTestingController;

  const activationEndpoint = "activation";

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);
    activationStateService = createMockInstance(ActivationStateService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ActivationService,
        { provide: EndpointService, useValue: endpointService },
        { provide: ActivationStateService, useValue: activationStateService },
        { provide: Logger, useClass: LoggerMock }
      ]
    });

    activationService = TestBed.get(ActivationService);
    httpTestingController = TestBed.get(HttpTestingController);

    endpointService.getEndpoint.mockReturnValue(activationEndpoint);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(activationService).toBeTruthy();
  });

  it("should emit activation on get activation", fakeAsync(() => {
    const expectedActivation = new ActivationEntityBuilder().build();
    activationService.activation$.subscribe((activation: ActivationEntity) => {
      expect(activation).toBe(expectedActivation);
    });

    activationService.getActivation();

    const req = httpTestingController.expectOne(activationEndpoint);
    expect(req.request.method).toBe("GET");
    req.flush(expectedActivation);
  }));
});
