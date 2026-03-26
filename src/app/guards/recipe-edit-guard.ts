import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanLeaveComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const recipeEditGuard: CanDeactivateFn<CanLeaveComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
