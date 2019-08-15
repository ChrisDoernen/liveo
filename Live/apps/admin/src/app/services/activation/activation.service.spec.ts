import { TestBed } from "@angular/core/testing";
import { ActivationService } from "./activation.service";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ActivationService", () => {
  let activationService: ActivationService;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ActivationService,
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    activationService = TestBed.get(ActivationService);
  });

  it("should be created", () => {
    expect(activationService).toBeTruthy();
  });
});
