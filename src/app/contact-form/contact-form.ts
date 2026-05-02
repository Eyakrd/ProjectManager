import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { emailExistsValidator } from '../email-exists.validator';
import { passwordStrengthValidator, matchPasswordValidator } from '../custom-validators';
import {User} from '../user';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitting = false;

  // Injection de FormBuilder
  constructor(
    private fb: FormBuilder,
    private userService: User,
  ) {}

  ngOnInit(): void {
    // FormGroup avec FormBuilder
    this.form = this.fb.group(
      {
        nom:    ['', [Validators.required, Validators.minLength(2)]],
        prenom: ['', [Validators.required, Validators.minLength(2)]],
        email:  [
          '',
          [Validators.required, Validators.email],
          [emailExistsValidator(this.userService)],
        ],
        telephone: ['', [Validators.pattern(/^[259][0-9]{7}$/)]],
        ville:    ['', Validators.required],
        message:   ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  // Getters pour chaque contrôle
  get nom()             { return this.form.get('nom');             }
  get prenom()          { return this.form.get('prenom');          }
  get email()           { return this.form.get('email');           }
  get telephone()       { return this.form.get('telephone');       }
  get ville()           { return this.form.get('ville');           }
  get message()         { return this.form.get('message');         }
  get password()        { return this.form.get('password');        }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get pwdErrors()       { return this.password?.errors?.['passwordStrength'] ?? {}; }

  //Marquer tous les champs comme touchés
  markFormGroupTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  //Reset du formulaire
  resetForm(): void {
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pending) {
      this.markFormGroupTouched();
      return;
    }
    console.log('Formulaire soumis :', this.form.value);
    this.resetForm();
  }
}
