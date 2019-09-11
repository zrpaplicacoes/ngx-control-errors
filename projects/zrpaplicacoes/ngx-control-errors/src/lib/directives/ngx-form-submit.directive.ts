import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'form, [form]',
})
export class NgxFormSubmitDirective {
  submit$ = fromEvent(this.el, 'submit').pipe(shareReplay(1));

  constructor(private host: ElementRef<HTMLFormElement>) {}

  get el() {
    return this.host.nativeElement;
  }
}
