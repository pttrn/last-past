import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { YEARS_REDUCER } from './reducers';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { UrlFromPayloadBuilderService } from './url-from-payload-builder.service';

export function provideAppStore(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideStore({
            years: YEARS_REDUCER,
            router: routerReducer
        }),
        provideRouterStore(),
        UrlFromPayloadBuilderService
    ])
}
