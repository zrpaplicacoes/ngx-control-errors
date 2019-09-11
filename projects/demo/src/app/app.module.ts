import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxControlErrorsModule,
  NgxControlErrors,
} from 'projects/zrpaplicacoes/ngx-control-errors/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxControlErrorsModule.forRoot({ validateOnFocusOut: true }),
  ],
  providers: [
    {
      provide: NgxControlErrors,
      useValue: {
        // override default for test
        required: () => 'o campo é obrigatório',
        // custom errors
        customError: () => `a custom error`,
      },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
