import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { pointReducers } from './store/points/point.reducers';
import { PointEffects } from './store/points/point.effects';
import { PointService } from './core/services/point.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({ point: pointReducers }),
    provideEffects([PointEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    PointService,
  ],
};
