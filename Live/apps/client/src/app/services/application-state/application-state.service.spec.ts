import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { ApplicationStateService } from "./application-state.service";

describe("ApplicationStateService", () => {
  let applicationStateService: ApplicationStateService;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApplicationStateService,
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    applicationStateService = TestBed.inject(ApplicationStateService);
  });

  it("should be created", () => {
    expect(applicationStateService).toBeTruthy();
  });
});
