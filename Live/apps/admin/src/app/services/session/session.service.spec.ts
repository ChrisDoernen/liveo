import { TestBed } from "@angular/core/testing";
import { SessionService } from "./session.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import createMockInstance from "jest-create-mock-instance";
import { EndpointService } from "@live/services";

describe("SessionService", () => {
  let sessionService: SessionService;
  let endpointService: jest.Mocked<EndpointService>;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SessionService,
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    sessionService = TestBed.get(SessionService);
  });

  it("should be created", () => {
    expect(sessionService).toBeTruthy();
  });
});
