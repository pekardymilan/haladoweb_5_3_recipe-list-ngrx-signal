import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { recipeEditGuard } from './recipe-edit-guard';

describe('recipeEditGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => recipeEditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
