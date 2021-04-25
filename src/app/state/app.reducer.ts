import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as appActions from './app.action';

export interface IApplicationState {
  loading: boolean;
  error?: string;
}

const defaultState: IApplicationState = {
  loading: false,
  error: ''
};

const getAppState = createFeatureSelector<IApplicationState>('app');

export const isLoading = createSelector(getAppState, state => state.loading);

const appreducer = createReducer<IApplicationState>(
  defaultState,
  on(appActions.toggleSpinnerAction, (state, action): IApplicationState => {
    return {
      ...state,
      loading: action.loading
    };
  })
);

export function appReducer(state: IApplicationState, action: any) {
  return appreducer(state, action);
}
