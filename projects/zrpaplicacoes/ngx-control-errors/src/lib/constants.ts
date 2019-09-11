import { InjectionToken } from '@angular/core';

export interface NgxControlErrorHandler {
  [error: string]: (...args: any[]) => string;
}

export interface NgxControlErrorOptions {
  validateOnFocusOut?: boolean;
}

export const defaultErrors: NgxControlErrorHandler = {
  min: ({ min, actual }) => `${min} > ${actual}`,
  max: ({ max, actual }) => `${actual} > ${max}`,
  required: () => 'required',
  email: () => 'invalid e-mail',
  minlength: ({ requiredLength, actualLength }) =>
    `${actualLength}/${requiredLength}`,
  maxlength: ({ requiredLength, actualLength }) =>
    `${actualLength}/${requiredLength}`,
  pattern: ({ requiredPattern: _, actualValue }) =>
    `${actualValue} does not match the desired pattern`,
  nullValidator: () => '',
};

export const NgxControlErrors = new InjectionToken<NgxControlErrorHandler>(
  'NgxControlErrors',
);

export const NgxControlErrorsOptions = new InjectionToken<
  NgxControlErrorOptions
>('NgxControlErrorsOptions');
