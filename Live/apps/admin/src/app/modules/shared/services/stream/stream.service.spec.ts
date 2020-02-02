import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { StreamService } from "./stream.service";
import { EndpointService } from "@live/services";

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
