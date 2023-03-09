import { bootstrapApplication } from '@angular/platform-browser';
import { LayoutComponent } from './app/main';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideStore } from '@ngrx/store';
import { YEARS_REDUCER } from './app/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { ApiModule } from './app/api';
import { provideEffects } from '@ngrx/effects';
import { ProfileSelectionEffect } from './app/store/profile-selection.effect';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(LayoutComponent, {
    providers: [
        importProvidersFrom(ApiModule),
        provideRouter(routes),
        provideStore({
            years: YEARS_REDUCER,
            router: routerReducer
        }),
        provideRouterStore(),
        provideEffects(ProfileSelectionEffect),
    ]
});
