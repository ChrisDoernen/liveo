import { TestBed } from "@angular/core/testing";
import { EndpointService } from "./endpoint.service";
import { ENDPOINTS, ROUTES } from "@live/constants";

describe("EndpointService", () => {
  let endpointService: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EndpointService, useValue: new EndpointService(ROUTES.admin) }]
    });

    endpointService = TestBed.get(EndpointService);
  });

  it("should be created", () => {
    expect(endpointService).toBeTruthy();
  });

  it("should return the right url", () => {
    const path = "streams";
    const url = endpointService.getEndpoint(path);

    const expectedUrl = `${ENDPOINTS.api}/${ROUTES.admin}/${path}`
    expect(url).toBe(expectedUrl);
  });
});
