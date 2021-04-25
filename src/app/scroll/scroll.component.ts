import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { IData } from './../data/data.model';
import { DataService } from './../data/data.service';
import { IFeatureState, getData, getLimitValue, getSkipValue } from './state/feature.reducer';

@UntilDestroy()
@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent {

  constructor(private store: Store<IFeatureState>, private dataService: DataService) {}

  readonly data$: Observable<IData[]> = this.store.select(getData);
  readonly limitValue$: Observable<number> = this.store.select(getLimitValue);
  readonly skipValue$: Observable<number> = this.store.select(getSkipValue);
  readonly loadMore$ = this.dataService.loadMoreData$.pipe(
    untilDestroyed(this),
    withLatestFrom(this.limitValue$),
    withLatestFrom(this.skipValue$),
    tap(([[loadMore, limit], skip]) => {
      if (loadMore) {
        this.dataService.loadMoreDataAction(limit, skip);
      }
    })
  );

  fetch(): void {
    this.dataService.fetchDataAction(10, 0);
    this.loadMore$.subscribe();
  }
}
