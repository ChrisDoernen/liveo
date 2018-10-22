import { TestBed } from '@angular/core/testing';
import { SessionService } from './session-service';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from '../endpoint-service/endpoint.service';

describe('SessionService', () => {
  let sessionService: SessionService;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let endpointService: jasmine.SpyObj<EndpointService>;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['']);
    const endpointServiceSpy = jasmine.createSpyObj('EndpointService', ['']);

    TestBed.configureTestingModule({
      providers: [
        SessionService, 
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: EndpointService, useValue: endpointServiceSpy}
      ]
    });

    sessionService = TestBed.get(SessionService);
    httpClient = TestBed.get(HttpClient);
    endpointService = TestBed.get(EndpointService);
  });

  it('should be created', () => {
    expect(sessionService).toBeTruthy();
  })
});
