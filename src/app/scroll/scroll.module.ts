import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { featureReducer } from './state/feature.reducer';
import { FeatureEffects } from './state/feature.effect';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { ScrollComponent } from './scroll.component';
import { DataService } from '../data/data.service';

const homeRoutes: Routes = [
  { path: 'scroll', component: ScrollComponent }
];

@NgModule({
  declarations: [
    ScrollComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    StoreModule.forFeature('feature', featureReducer),
    EffectsModule.forFeature([FeatureEffects]),
    MatListModule,
    MatButtonModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataService
  ]
})
export class ScrollModule {}
