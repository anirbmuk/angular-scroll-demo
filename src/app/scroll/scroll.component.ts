import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IFeatureState, getData, getLimitValue, getSkipValue } from './state/feature.reducer';

import { IData } from './../data/data.model';

import { DataService } from './../data/data.service';

@UntilDestroy()
@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {

  constructor(private readonly store: Store<IFeatureState>, private readonly dataService: DataService) {}

  readonly data$: Observable<IData[]> = this.store.select(getData);
  readonly limitValue$: Observable<number> = this.store.select(getLimitValue);
  readonly skipValue$: Observable<number> = this.store.select(getSkipValue);

  readonly loadMore$ = this.dataService.loadMoreData$.pipe(
    untilDestroyed(this),
    filter((loadMore: boolean) => loadMore),
    withLatestFrom(this.limitValue$, this.skipValue$),
    tap(([_, limit, skip]) => this.dataService.loadMoreDataAction(limit, skip))
  );

  ngOnInit(): void {
    this.loadMore$.subscribe();
  }

  fetch(): void {
    this.dataService.fetchDataAction(10, 0);
  }

  trackByIdFn(_: number, data: IData): number {
    return data.id;
  }
}
