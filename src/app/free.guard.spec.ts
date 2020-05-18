import { TestBed } from '@angular/core/testing';

import { FreeGuard } from './free.guard';

describe('FreeGuard', () => {
  let guard: FreeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FreeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
