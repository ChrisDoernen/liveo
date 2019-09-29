import { TestBed } from "@angular/core/testing";
import { ApplicationStateService } from "./application-state.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EndpointService, Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { LoggerMock } from "@live/test-utilities";

describe("ApplicationStateService", () => {
  let applicationStateService: ApplicationStateService;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApplicationStateService,
        { provide: EndpointService, useValue: endpointService },
        { provide: Logger, useClass: LoggerMock }
      ]
    });

    applicationStateService = TestBed.get(ApplicationStateService);
  });

  it("should be created", () => {
    expect(applicationStateService).toBeTruthy();
  });
});
