import { TestBed } from '@angular/core/testing';

import { ResultDownloadService } from './result-download.service';

describe('ResultDownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultDownloadService = TestBed.get(ResultDownloadService);
    expect(service).toBeTruthy();
  });
});
