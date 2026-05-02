import { TestBed } from '@angular/core/testing';
import { ValidationService } from './validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;
  let fb: FormBuilder;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
    fb = new FormBuilder();
  });

  describe('getErrorMessage', () => {
    it('should return empty string for valid control', () => {
      const control = fb.control('valid value');
      const message = service.getErrorMessage(control);
      expect(message).toBe('');
    });

    it('should return required message', () => {
      const control = fb.control('', Validators.required);
      control.markAsTouched();
      control.updateValueAndValidity();
      const message = service.getErrorMessage(control);
      expect(message).toContain('Ce champ est requis');
    });

    it('should return email message', () => {
      const control = fb.control('invalid', Validators.email);
      control.markAsTouched();
      control.updateValueAndValidity();
      const message = service.getErrorMessage(control);
      expect(message).toContain('Format d\'email invalide');
    });

    it('should return minlength message', () => {
      const control = fb.control('a', Validators.minLength(5));
      control.markAsTouched();
      control.updateValueAndValidity();
      const message = service.getErrorMessage(control);
      expect(message).toContain('Minimum 5 caractères');
    });

    it('should return min message for number', () => {
      const control = fb.control(5, Validators.min(18));
      control.markAsTouched();
      control.updateValueAndValidity();
      const message = service.getErrorMessage(control);
      expect(message).toContain('Valeur minimale : 18');
    });

    it('should handle null control', () => {
      const message = service.getErrorMessage(null);
      expect(message).toBe('');
    });
  });

  describe('hasError', () => {
    it('should return true when control has error and is touched', () => {
      const control = fb.control('', Validators.required);
      control.markAsTouched();
      control.updateValueAndValidity();
      const result = service.hasError(control, 'required');
      expect(result).toBe(true);
    });

    it('should return false when control has error but not touched', () => {
      const control = fb.control('', Validators.required);
      const result = service.hasError(control, 'required');
      expect(result).toBe(false);
    });

    it('should return false when control has no error', () => {
      const control = fb.control('valid');
      control.markAsTouched();
      const result = service.hasError(control, 'required');
      expect(result).toBe(false);
    });

    it('should handle null control', () => {
      const result = service.hasError(null, 'required');
      expect(result).toBe(false);
    });
  });

  describe('isInvalid', () => {
    it('should return true when control is invalid and touched', () => {
      const control = fb.control('', Validators.required);
      control.markAsTouched();
      control.updateValueAndValidity();
      const result = service.isInvalid(control);
      expect(result).toBe(true);
    });

    it('should return false when control is invalid but not touched', () => {
      const control = fb.control('', Validators.required);
      control.updateValueAndValidity();
      const result = service.isInvalid(control);
      expect(result).toBe(false);
    });

    it('should return false when control is valid', () => {
      const control = fb.control('valid');
      control.markAsTouched();
      const result = service.isInvalid(control);
      expect(result).toBe(false);
    });
  });

  describe('isValid', () => {
    it('should return true when control is valid and touched', () => {
      const control = fb.control('valid');
      control.markAsTouched();
      const result = service.isValid(control);
      expect(result).toBe(true);
    });

    it('should return false when control is valid but not touched', () => {
      const control = fb.control('valid');
      const result = service.isValid(control);
      expect(result).toBe(false);
    });

    it('should return false when control is invalid', () => {
      const control = fb.control('', Validators.required);
      control.markAsTouched();
      control.updateValueAndValidity();
      const result = service.isValid(control);
      expect(result).toBe(false);
    });
  });
});

