import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './feature.action';
import * as appActions from './../../state/app.action';

import { IData } from './../../data/data.model';

import { DataService } from './../../data/data.service';

@Injectable()
export class FeatureEffects {

  constructor(private action$: Actions, private dataService: DataService) {}

  readonly fetchData$ = createEffect(() =>
    this.action$.pipe(
      ofType(featureActions.fetchDataAction),
      exhaustMap(action => this.dataService.fetchData(action.limit, action.skip).pipe(
        switchMap((data: IData[]) => [
          appActions.toggleSpinnerAction({ loading: false }),
          featureActions.fetchDataSuccessAction({ limit: action.limit, skip: action.skip, data })
        ]),
        catchError((error: any) =>
          from([
            appActions.toggleSpinnerAction({ loading: false }),
            featureActions.fetchDataErrorAction({ error })
          ])
        )
      ))
    )
  );

  readonly fetchMoreData$ = createEffect(() =>
    this.action$.pipe(
      ofType(featureActions.loadMoreDataAction),
      exhaustMap(action => this.dataService.fetchData(action.limit, action.skip).pipe(
        switchMap((data: IData[]) => [
          appActions.toggleSpinnerAction({ loading: false }),
          featureActions.loadMoreDataSuccessAction({ limit: action.limit, skip: action.skip, data })
        ]),
        catchError((error: any) =>
          from([
            appActions.toggleSpinnerAction({ loading: false }),
            featureActions.loadMoreDataErrorAction({ error })
          ])
        )
      ))
    )
  );
}
