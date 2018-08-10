import { TestBed, inject } from '@angular/core/testing';

import { StreamsServiceService } from './streams-service.service';

describe('StreamsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamsServiceService]
    });
  });

  it('should be created', inject([StreamsServiceService], (service: StreamsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
