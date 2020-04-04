import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EndpointService } from "@liveo/services";
import { StreamService } from "./stream.service";

describe("StreamService", () => {
  let streamService: StreamService;
  let httpClient = jest.fn();
  let endpointService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StreamService,
        { provide: HttpClient, useValue: httpClient },
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    streamService = TestBed.get(StreamService);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(streamService).toBeTruthy();
  });
});
