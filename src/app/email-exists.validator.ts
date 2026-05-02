import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounceTime, switchMap, first } from 'rxjs/operators';
import {User} from './user';


export function emailExistsValidator(userService: User): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => userService.checkEmailExists(value)),
      map(exists => (exists ? { emailExists: true } : null)),
      first(),
    );
  };
}
