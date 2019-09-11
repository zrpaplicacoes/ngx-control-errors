import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      min: [null, [Validators.min(5)]],
      max: [null, [Validators.max(5)]],
      required: [null, [Validators.required]],
      requiredTrue: [null, [Validators.requiredTrue]],
      email: [null, [Validators.email]],
      minLength: [null, [Validators.minLength(5)]],
      maxLength: [null, [Validators.maxLength(5)]],
      pattern: [null, [Validators.pattern(/\D/gi)]],
      null: [null, [Validators.nullValidator]],
      custom: [
        null,
        [
          (_: AbstractControl) => {
            return { customError: true };
          },
        ],
      ],
    });
  }

  onSubmit() {}
}
