import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { ShutdownService } from "./shutdown.service";
import { EndpointService } from "@live/services";

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