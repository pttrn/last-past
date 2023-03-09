import { NgModule } from '@angular/core';
import { ApiArtistsListService } from './api-artists-list.service';
import { ApiYearsAvailableService } from './api-years-available.service';

@NgModule({
    providers: [
        ApiArtistsListService,
        ApiYearsAvailableService
    ]
})
export class ApiModule {

}
