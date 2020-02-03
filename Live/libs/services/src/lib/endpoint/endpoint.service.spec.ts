import { TestBed } from "@angular/core/testing";
import { ENDPOINTS, ROUTES } from "@live/constants";
import { ENABLECONSOLELOGGING } from "../logging/logger";
import { EndpointService, ROUTE } from "./endpoint.service";

describe("EndpointService", () => {
  let endpointService: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ENABLECONSOLELOGGING,
          useValue: false
        },
        {
          provide: ROUTE,
          useValue: ROUTES.admin
        }
      ]
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

  it("should return the right url with query params", () => {
    const path = "streams";
    const queryParams = ["refresh=true"];
    const url = endpointService.getEndpoint(path, queryParams);

    const expectedUrl = `${ENDPOINTS.api}/${ROUTES.admin}/${path}?refresh=true`
    expect(url).toBe(expectedUrl);
  });
});
