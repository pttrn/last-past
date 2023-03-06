import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { L10nService } from './l10n.service';
import { animationFrameScheduler, BehaviorSubject, debounce, debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';

@Pipe({
    name: 'l10n',
    pure: false
})
export class L10nPipe implements PipeTransform, OnDestroy {
    private key?: keyof L10nService;
    private value: string = '';
    private sub?: Subscription;

    constructor(
        private readonly cdRef: ChangeDetectorRef,
        private readonly l10nService: L10nService
    ) {
    }

    public transform(key: keyof L10nService): string {
        if (this.key !== key) {
            this.sub?.unsubscribe();
            this.sub = this.getObservable(key).pipe(
                distinctUntilChanged(),
            ).subscribe((v) => {
                this.value = v;
                this.cdRef.markForCheck();
            })
            this.key = key;
        }
        return this.value;
    }

    public ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    private getObservable(origKey: keyof L10nService): Observable<string> {
        let key = origKey;
        if (!this.isObservable(origKey)) {
            const extendedKey = `${origKey}$` as keyof L10nService;
            if (this.isObservable(extendedKey)) {
                key = extendedKey;
            } else {
                const missingKeyWarning = `l10n key is missing: ${origKey}`;
                console.warn(missingKeyWarning);
                return new BehaviorSubject(missingKeyWarning);
            }
        }
        return this.l10nService[key] as Observable<string>;
    }

    private isObservable(key: keyof L10nService): boolean {
        return typeof this.l10nService[key] === 'object' && ('subscribe' in (this.l10nService[key] as object));
    }
}
