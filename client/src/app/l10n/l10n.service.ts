import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class L10nService {
    public readonly history$ = new BehaviorSubject('Years');
    public readonly history = 'Years';

    public readonly about$ = new BehaviorSubject('About');
    public readonly about = 'About';

    public readonly artistImageAlt$ = new BehaviorSubject('artist image');
    public readonly artistImageAlt = 'artist image';
}
