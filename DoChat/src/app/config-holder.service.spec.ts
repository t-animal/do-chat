import { TestBed } from '@angular/core/testing';

import { ConfigHolderService } from './config-holder.service';

describe('ConfigHolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigHolderService = TestBed.get(ConfigHolderService);
    expect(service).toBeTruthy();
  });
});
