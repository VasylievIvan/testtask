import { TestBed, inject } from '@angular/core/testing';

import { MoviedataService } from './moviedata.service';

describe('MoviedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviedataService]
    });
  });

  it('should be created', inject([MoviedataService], (service: MoviedataService) => {
    expect(service).toBeTruthy();
  }));
});
