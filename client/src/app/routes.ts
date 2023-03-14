import { Routes } from '@angular/router';

export const HISTORY_ROUTE = 'history';
export const ABOUT_ROUTE = 'about';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main/no-profile-specified').then((mod) => mod.NoProfileSpecifiedComponent),
        pathMatch: 'full'
    },
    {
        path: ':profile',
        loadComponent: () => import('./main/profile-specified').then((mod) => mod.ProfileSpecifiedComponent),
        children: [ {
            path: HISTORY_ROUTE,
            loadComponent: () => import('./history').then((mod) => mod.HistoryComponent),
            children: [ { // years
                path: ':year',
                loadComponent: () => import('./stub').then((mod) => mod.StubComponent),
                children: [ { // months
                    path: ':month',
                    loadComponent: () => import('./history').then((mod) => mod.MonthsContainerComponent),
                    // children: [ { // days
                    //     path: ':day',
                    //     loadComponent: () => import('./history').then((mod) => mod.ArtistsListComponent)
                    // } ]
                } ]
            } ],
        } ]
    }
];
