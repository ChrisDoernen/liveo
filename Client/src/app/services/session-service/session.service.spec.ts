import { TestBed } from "@angular/core/testing";
import { SessionService } from "./session-service";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint-service/endpoint.service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let httpClient = jest.fn();
  let endpointService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: HttpClient, useValue: httpClient },
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    sessionService = TestBed.get(SessionService);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(sessionService).toBeTruthy();
  });
});
