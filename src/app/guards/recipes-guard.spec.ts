import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { recipesGuard } from './recipes-guard';

describe('recipesGuardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => recipesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
