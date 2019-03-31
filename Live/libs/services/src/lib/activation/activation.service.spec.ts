import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { ActivationService } from "./activation.service";

describe("ActivationService", () => {
    let activationService: ActivationService;
    let httpClient = jest.fn();
    let endpointService = jest.fn();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ActivationService,
                { provide: HttpClient, useValue: httpClient },
                { provide: EndpointService, useValue: endpointService }
            ]
        });

        activationService = TestBed.get(ActivationService);
        httpClient = TestBed.get(HttpClient);
        endpointService = TestBed.get(EndpointService);
    });

    it("should be created", () => {
        expect(activationService).toBeTruthy();
    });
});
