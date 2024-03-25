import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxControlErrorsComponent } from './components/ngx-control-errors.component';
import {
  NgxControlErrorOptions,
  NgxControlErrors,
  NgxControlErrorsOptions,
  defaultErrors,
} from './constants';
import { NgxControlErrorsDirective } from './directives/ngx-control-errors.directive';
import { NgxFormSubmitDirective } from './directives/ngx-form-submit.directive';

@NgModule({
  declarations: [
    NgxFormSubmitDirective,
    NgxControlErrorsDirective,
    NgxControlErrorsComponent,
  ],
  imports: [CommonModule],
  exports: [
    NgxFormSubmitDirective,
    NgxControlErrorsDirective,
    NgxControlErrorsComponent,
  ],
})
export class NgxControlErrorsModule {
  static forRoot(config?: NgxControlErrorOptions): ModuleWithProviders<NgxControlErrorsModule> {
    return {
      ngModule: NgxControlErrorsModule,
      providers: [
        {
          provide: NgxControlErrors,
          useValue: defaultErrors,
          multi: true,
        },
        {
          provide: NgxControlErrorsOptions,
          useValue: {
            validateOnFocusOut: false,
            ...(config || {}),
          } as NgxControlErrorOptions,
        },
      ],
    };
  }
}
