import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { ShutdownService } from "./shutdown.service";

describe("ShutdownService", () => {
  let shutdownService: ShutdownService;
  let httpClient = jest.fn();
  let endpointService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShutdownService,
        { provide: HttpClient, useValue: httpClient },
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    shutdownService = TestBed.get(ShutdownService);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(shutdownService).toBeTruthy();
  });
});