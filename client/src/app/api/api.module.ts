import { NgModule } from '@angular/core';
import { ApiArtistsListService } from './api-artists-list.service';
import { ApiListeningDatesService } from './api-listening-dates.service';

@NgModule({
    providers: [
        ApiArtistsListService,
        ApiListeningDatesService
    ]
})
export class ApiModule {

}
