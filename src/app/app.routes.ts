import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Joy Sarkar — Full-Stack & AI Developer',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
