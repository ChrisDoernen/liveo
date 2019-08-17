import { TestBed } from "@angular/core/testing";
import { ActivationService } from "./activation.service";
import { EndpointService, ActivationStateService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ActivationService", () => {
  let activationService: ActivationService;
  let endpointService: jest.Mocked<EndpointService>;
  let activationStateService: jest.Mocked<ActivationStateService>;

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
        { provide: ActivationStateService, useValue: activationStateService }
      ]
    });

    activationService = TestBed.get(ActivationService);
  });

  it("should be created", () => {
    expect(activationService).toBeTruthy();
  });
});
