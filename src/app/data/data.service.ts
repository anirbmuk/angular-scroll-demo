import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, fromEvent, Observable, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

import { IData } from './data.model';
import { IFeatureState, isSearched, isAllLoaded, getLimitValue, getSkipValue } from './../scroll/state/feature.reducer';
import * as appActions from './../state/app.action';
import * as featureActions from './../scroll/state/feature.action';

const sampleData: IData[] = [
  { id: 1, state: 'Andhra Pradesh', capital: 'Amaravati' },
  { id: 2, state: 'Arunachal Pradesh', capital: 'Itanagar' },
  { id: 3, state: 'Assam', capital: 'Dispur' },
  { id: 4, state: 'Bihar', capital: 'Patna' },
  { id: 5, state: 'Goa', capital: 'Panaji' },
  { id: 6, state: 'Haryana', capital: 'Chandigarh' },
  { id: 7, state: 'Himachal Pradesh', capital: 'Shimla' },
  { id: 8, state: 'Jharkhand', capital: 'Ranchi' },
  { id: 9, state: 'Karnataka', capital: 'Bengaluru' },
  { id: 10, state: 'Kerala', capital: 'Thiruvananthapuram' },
  { id: 11, state: 'Madhya Pradesh', capital: 'Bhopal' },
  { id: 12, state: 'Maharashtra', capital: 'Mumbai' },
  { id: 13, state: 'Manipur', capital: 'Imphal' },
  { id: 14, state: 'Meghalaya', capital: 'Shillong' },
  { id: 15, state: 'Mizoram', capital: 'Aizawl' },
  { id: 16, state: 'Nagaland', capital: 'Kohima' },
  { id: 17, state: 'Odisha', capital: 'Bhubaneshwar' },
  { id: 18, state: 'Punjab', capital: 'Chandigarh' },
  { id: 19, state: 'Rajasthan', capital: 'Jaipur' },
  { id: 20, state: 'Sikkim', capital: 'Gangtok' },
  { id: 21, state: 'Tamil Nadu', capital: 'Chennai' },
  { id: 22, state: 'Telangana', capital: 'Hyderabad' },
  { id: 23, state: 'Tripura', capital: 'Agartala' },
  { id: 24, state: 'Uttarakhand', capital: 'Dehradun' },
  { id: 25, state: 'Uttar Pradesh', capital: 'Lucknow' },
  { id: 26, state: 'West Bengal', capital: 'Kolkata' },
  { id: 27, state: 'Andaman and Nicobar Islands', capital: 'Port Blair' },
  { id: 28, state: 'Dadra & Nagar Haveli and Daman & Diu', capital: 'Daman' },
  { id: 29, state: 'Jammu & Kashmir', capital: 'Srinagar & Jammu' },
  { id: 30, state: 'Lakshadweep', capital: 'Kavaratti' },
  { id: 31, state: 'Chandigarh', capital: 'Chandigarh' },
  { id: 32, state: 'The Government of NCT of Delhi', capital: 'Delhi' },
  { id: 33, state: 'Ladakh', capital: 'Leh' },
  { id: 34, state: 'Puducherry', capital: 'Puducherry' }
];

@Injectable()
export class DataService {

  constructor(private store: Store<IFeatureState>) {}

  readonly scrollAction$: Observable<Event> = fromEvent(document, 'scroll');
  readonly isSearched$: Observable<boolean> = this.store.select(isSearched);
  readonly isAllLoaded$: Observable<boolean> = this.store.select(isAllLoaded);
  readonly getLimitValue$: Observable<number> = this.store.select(getLimitValue);
  readonly getSkipValue$: Observable<number> = this.store.select(getSkipValue);

  readonly loadMoreData$: Observable<boolean> = combineLatest([
    this.isSearched$,
    this.scrollAction$,
    this.isAllLoaded$
  ]).pipe(
    map(([searched, _, allLoaded]) => {
      if (searched && !allLoaded) {
        return (
          Math.floor(
            document.documentElement.scrollHeight -
            document.documentElement.scrollTop -
            document.documentElement.clientHeight
          ) === 0
        );
      }
      return false;
    })
  );

  public fetchData(limit: number, skip: number): Observable<IData[]> {
    return of(sampleData.slice(skip, limit)).pipe(delay(1500), take(1));
  }

  public fetchDataAction(limit: number, skip: number): void {
    this.store.dispatch(appActions.toggleSpinnerAction({ loading: true }));
    this.store.dispatch(featureActions.fetchDataAction({ limit, skip }));
  }

  public loadMoreDataAction(limit: number, skip: number): void {
    this.store.dispatch(appActions.toggleSpinnerAction({ loading: true }));
    this.store.dispatch(featureActions.loadMoreDataAction({ limit, skip }));
  }
}
