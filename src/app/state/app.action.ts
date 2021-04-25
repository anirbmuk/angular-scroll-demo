import { createAction, props } from '@ngrx/store';

export const toggleSpinnerAction = createAction(
  '[App] Toggle Spinner',
  props<{ loading: boolean }>()
);
