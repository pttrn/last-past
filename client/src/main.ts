import { bootstrapApplication } from '@angular/platform-browser';
import { LayoutComponent } from './app/main';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/routes';
import { ProfileSelectionEffects, provideAppStore, YearsSelectionEffects } from './app/store';
import { ApiModule } from './app/api';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHistoryUrlBuilders } from './app/history';
import { UrlFromPayloadBuilderService } from './app/store/url-from-payload-builder.service';

bootstrapApplication(LayoutComponent, {
    providers: [
        importProvidersFrom(ApiModule),
        provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
        provideAppStore(),
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
        }),
        UrlFromPayloadBuilderService,
        provideHistoryUrlBuilders()
    ]
});
