import { bootstrapApplication } from '@angular/platform-browser';
import { LayoutComponent } from './app/main';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';

bootstrapApplication(LayoutComponent, {
    providers: [
        provideRouter(routes)
    ]
});
