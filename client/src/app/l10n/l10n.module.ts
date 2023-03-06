import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nService } from './l10n.service';
import { L10nPipe } from './l10n.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        L10nPipe,
    ],
    exports: [
        L10nPipe,
    ],
    providers: [
        L10nService
    ]
})
export class L10nModule {
}
