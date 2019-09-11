import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'ngx-control-errors',
  template: `
    {{ _message }}
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxControlErrorsComponent {
  // tslint:disable-next-line: variable-name
  @HostBinding('style.display=none') _show = false;
  // tslint:disable-next-line: variable-name
  _message: string;

  constructor(private cdr: ChangeDetectorRef) {}

  @Input() set message(newMessage) {
    if (newMessage !== this._message) {
      this._message = newMessage;
      this._show = !!newMessage;

      this.cdr.detectChanges();
    }
  }
}
