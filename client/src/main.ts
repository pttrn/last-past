import { bootstrapApplication } from '@angular/platform-browser';
import { LayoutComponent } from './app/main';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideStore } from '@ngrx/store';
import { YEARS_REDUCER } from './app/store';

bootstrapApplication(LayoutComponent, {
    providers: [
        provideRouter(routes),
        provideStore({
            years: YEARS_REDUCER
        })
    ]
});
