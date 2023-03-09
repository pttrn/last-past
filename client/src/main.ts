import { bootstrapApplication } from '@angular/platform-browser';
import { LayoutComponent } from './app/main';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/routes';
import { provideStore } from '@ngrx/store';
import { ProfileSelectionEffects, YEARS_REDUCER, YearsSelectionEffects } from './app/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { ApiModule } from './app/api';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(LayoutComponent, {
    providers: [
        importProvidersFrom(ApiModule),
        provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
        provideStore({
            years: YEARS_REDUCER,
            router: routerReducer
        }),
        provideRouterStore(),
        provideEffects(
            ProfileSelectionEffects,
            YearsSelectionEffects
        ),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        })
    ]
});
