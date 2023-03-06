import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class L10nService {
    public readonly years$ = new BehaviorSubject('Years');
    public readonly years = 'Years';

    public readonly about$ = new BehaviorSubject('About');
    public readonly about = 'About';

    public readonly artistImageAlt$ = new BehaviorSubject('artist image');
    public readonly artistImageAlt = 'artist image';
}
