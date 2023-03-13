import { Routes } from '@angular/router';

export const HISTORY_ROUTE = 'history';
export const ABOUT_ROUTE = 'about';

export const routes: Routes = [
    // {
    //     path: '',
    //     loadComponent: () => import('./main/no-profile-specified').then((mod) => mod.NoProfileSpecifiedComponent),
    //     pathMatch: 'full'
    // },
    {
        path: ':profile',
        loadComponent: () => import('./main/profile-specified').then((mod) => mod.ProfileSpecifiedComponent),
        children: [ {
            path: HISTORY_ROUTE,
            loadComponent: () => import('./history/history').then((mod) => mod.HistoryComponent),
            children: [ { // years
                path: ':year',
                loadComponent: () => import('./history').then((mod) => mod.YearsListComponent),
                children: [ { // months
                    path: ':month',
                    loadComponent: () => import('./history').then((mod) => mod.ArtistsListComponent)
                } ]
            }, {
                path: '**',
                loadComponent: () => import('./not-found').then((mod) => mod.NotFoundComponent)
            } ],
        },
            // {
            // path: '**',
            // loadComponent: () => import('./not-found').then((mod) => mod.NotFoundComponent)
            // }
        ]
    }
];
