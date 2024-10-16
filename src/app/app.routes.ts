import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/map/map.component').then((m) => m.MapComponent),
  },
  { path: '**', redirectTo: '' },
];
