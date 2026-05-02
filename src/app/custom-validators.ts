import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';
    const errors: Record<string, boolean> = {};

    if (value.length < 8)                              errors['tooShort']    = true;
    if (!/[A-Z]/.test(value))                          errors['noUppercase'] = true;
    if (!/[a-z]/.test(value))                          errors['noLowercase'] = true;
    if (!/[0-9]/.test(value))                          errors['noNumber']    = true;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))        errors['noSpecial']   = true;

    return Object.keys(errors).length ? { passwordStrength: errors } : null;
  };
}

export function matchPasswordValidator(
  passwordKey: string,
  confirmKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirm  = group.get(confirmKey)?.value;
    return password === confirm ? null : { mustMatch: true };
  };
}
