import { TestBed } from '@angular/core/testing';

import { CatApiService } from './cat-api.service';

describe('CatApiService', () => {
  let service: CatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
