import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './state/app.reducer';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from './../environments/environment';

import { ScrollModule } from './scroll/scroll.module';

import { AppComponent } from './app.component';

const rootRoutes: Routes = [
  { path: '', redirectTo: '/scroll', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(rootRoutes),
    StoreModule.forRoot({ app : appReducer }),
    EffectsModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument({ name: 'ScrollDemo Devtools', maxAge: 50 }),
    ScrollModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
