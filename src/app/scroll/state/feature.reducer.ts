import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as featureActions from './feature.action';

import { IData } from './../../data/data.model';

export interface IFeatureState {
  searched: boolean;
  allLoaded: boolean;
  limit: number;
  skip: number;
  data: IData[];
  error?: string;
}

const defaultState: IFeatureState = {
  searched: false,
  allLoaded: false,
  data: [],
  error: '',
  limit: 10,
  skip: 0
};

const getAppState = createFeatureSelector<IFeatureState>('feature');

export const getData = createSelector(getAppState, state => state.data);
export const getLimitValue = createSelector(getAppState, state => state.limit);
export const getSkipValue = createSelector(getAppState, state => state.skip);
export const isSearched = createSelector(getAppState, state => state.searched);
export const isAllLoaded = createSelector(getAppState, state => state.allLoaded);

const featurereducer = createReducer<IFeatureState>(
  defaultState,
  on(
    featureActions.fetchDataAction,
    (state) => {
      return {
        ...state,
        error: '',
        data: [],
        allLoaded: false
      };
    }
  ),
  on(
    featureActions.fetchDataSuccessAction,
    (state, action) => {
      return {
        ...state,
        error: '',
        searched: true,
        data: action.data,
        limit: (action.limit + defaultState.limit),
        skip: (action.skip + defaultState.limit)
      };
    }
  ),
  on(
    featureActions.loadMoreDataSuccessAction,
    (state, action) => {
      const allLoaded = action.data?.length < (action.limit - action.skip);
      return {
        ...state,
        error: '',
        allLoaded,
        data: [ ...state.data, ...action.data ],
        limit: (action.limit + defaultState.limit),
        skip: (action.skip + defaultState.limit)
      };
    }
  ),
  on(
    featureActions.fetchDataErrorAction,
    featureActions.loadMoreDataErrorAction,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  )
);

export function featureReducer(state: IFeatureState, action: any) {
  return featurereducer(state, action);
}
