import { TestBed } from '@angular/core/testing';

import { MothGuard } from './moth.guard';

describe('MothGuard', () => {
  let guard: MothGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MothGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
