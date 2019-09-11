import {
  Directive,
  Self,
  OnInit,
  OnDestroy,
  Optional,
  Host,
  Inject,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ElementRef,
  NgZone,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, merge, Observable, fromEvent } from 'rxjs';
import {
  takeUntil,
  map,
  mergeMap,
  take,
  first,
  shareReplay,
  filter,
} from 'rxjs/operators';
import { NgxFormSubmitDirective } from './ngx-form-submit.directive';
import {
  NgxControlErrors,
  NgxControlErrorHandler,
  NgxControlErrorsOptions,
  NgxControlErrorOptions,
} from '../constants';
import { NgxControlErrorsComponent } from '../components/ngx-control-errors.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]',
})
export class NgxControlErrorsDirective implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private blurOut$: Observable<void>;
  private ref: ComponentRef<NgxControlErrorsComponent>;

  constructor(
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private zone: NgZone,

    // Self references
    @Self() private controlDir: NgControl,
    @Self() private el: ElementRef,

    @Inject(NgxControlErrors) private errors: NgxControlErrorHandler[],

    @Optional() @Host() private form: NgxFormSubmitDirective,

    @Optional()
    @Inject(NgxControlErrorsOptions)
    private opts: NgxControlErrorOptions,
  ) {}

  ngOnInit() {
    this.blurOut$ = fromEvent(this.el.nativeElement, 'blur').pipe(
      shareReplay(1),
      mergeMap(() => this.zone.onStable.pipe(take(1))),
      filter(() => this.opts && this.opts.validateOnFocusOut),
    );

    merge(this.blurOut$, this.form.submit$, this.controlDir.valueChanges)
      .pipe(
        takeUntil(this.destroy$),
        map(_ => Object.keys(this.controlDir.errors || {})),
        map((keys: string[]) => keys[0]),
        map((key: string) => {
          if (key) {
            return { key, error: this.controlDir.errors[key] };
          } else {
            return { key: null, error: null };
          }
        }),
        map(({ key, error }) => this.getErrorMessage(key, error)),
      )
      .subscribe((message: string | undefined) => {
        this.setError(message);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.destroy$ = null;
  }

  private setError(message: string) {
    if (!this.ref) {
      const factory = this.cfr.resolveComponentFactory(
        NgxControlErrorsComponent,
      );

      this.ref = this.vcr.createComponent(factory);
    }

    this.ref.instance.message = message;
  }

  private getErrorMessage(key: string, error: any): string {
    if (key === null) {
      return '';
    }

    const allErrors = this.errors.reduce((prev, current) => {
      return { ...prev, ...current };
    }, {});

    const fn = allErrors[key];

    if (!fn || typeof fn !== 'function') {
      throw new Error(
        `
        An unhandled error (${key}) was found.

        Please, register within NgxControlErrors a handler for ${key}.
        Example:

        {
          provide: NgxControlErrors,
          useValue: {
            // ... other handlers
            ${key}: (...args: any[]) => 'my handler',
          },
          multi: true,
        }
        `,
      );
    }

    return fn(error);
  }
}
