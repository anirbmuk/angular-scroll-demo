import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IApplicationState, isLoading } from './state/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private store: Store<IApplicationState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(isLoading);
  }
}
