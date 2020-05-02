import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EndpointService } from "@liveo/services";
import { StreamsClient } from "./streams.client";

describe("StreamsClient", () => {
  let streamClient: StreamsClient;
  let httpClient = jest.fn();
  let endpointService = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StreamsClient,
        { provide: HttpClient, useValue: httpClient },
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    streamClient = TestBed.get(StreamsClient);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(streamClient).toBeTruthy();
  });
});
