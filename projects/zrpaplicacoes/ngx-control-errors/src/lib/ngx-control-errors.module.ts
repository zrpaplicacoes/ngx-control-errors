import { NgModule } from '@angular/core';
import { NgxControlErrorsComponent } from './components/ngx-control-errors.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgxFormSubmitDirective } from './directives/ngx-form-submit.directive';
import { NgxControlErrorsDirective } from './directives/ngx-control-errors.directive';
import { CommonModule } from '@angular/common';
import {
  NgxControlErrors,
  defaultErrors,
  NgxControlErrorsOptions,
  NgxControlErrorOptions,
} from './constants';

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
  static forRoot(config?: NgxControlErrorOptions): ModuleWithProviders {
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
