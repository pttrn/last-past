import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-profile-input',
    templateUrl: './profile-input.component.html',
    styleUrls: [ './profile-input.component.scss' ],
    imports: [
        ReactiveFormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInputComponent {
    @Output() public readonly nameChange = new EventEmitter<string>();

    public readonly form: FormGroup;
    public readonly nameControlName;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.nameControlName = 'name';
        this.form = formBuilder.group({
            [this.nameControlName]: [ '' ]
        });
    }

    @Input()
    public set name(v: string | null) {
        if (this.nameControl.value !== v) {
            this.nameControl.setValue(v);
        }
    }

    public onSubmit(): void {
        this.nameChange.emit(this.nameControl.value);
    }

    private get nameControl(): AbstractControl {
        return this.form.controls[this.nameControlName];
    }
}
