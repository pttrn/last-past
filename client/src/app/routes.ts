import { Routes } from '@angular/router';

export const YEARS_ROUTE = 'years';
export const ABOUT_ROUTE = 'about';

export const routes: Routes = [
    { path: YEARS_ROUTE, loadComponent: () => import('./years-list').then((mod) => mod.YearsListComponent) },
    { path: ABOUT_ROUTE, loadComponent: () => import('./about').then((mod) => mod.AboutComponent) },
    { path: '', redirectTo: YEARS_ROUTE, pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./not-found').then((mod) => mod.NotFoundComponent) }
];
