import { TestBed } from "@angular/core/testing";
import { EndpointService } from "./endpoint.service";

describe("EndpointService", () => {
  let endpointService: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointService]
    });

    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(endpointService).toBeTruthy();
  });
});
