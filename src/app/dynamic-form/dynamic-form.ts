import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormArray, FormBuilder, FormGroup,
  ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ValidationService } from '../validation.service';

function minCompetencesValidator(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const fa = control as FormArray;
    return fa.length > 0 && fa.length < min
      ? { minCompetences: { required: min, actual: fa.length } }
      : null;
  };
}

function minAddressesValidator(min: number = 1) {
  return (control: AbstractControl): ValidationErrors | null => {
    const fa = control as FormArray;
    return fa.length >= min ? null : { minAddresses: { required: min, actual: fa.length } };
  };
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, JsonPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm implements OnInit {

  activeTab: 'emails' | 'competences' | 'adresse' | 'adresses' = 'emails';

  emailForm!: FormGroup;
  competenceForm!: FormGroup;
  userWithAddressForm!: FormGroup;
  multiAddressForm!: FormGroup;

  toast: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      nom:    ['', Validators.required],
      emails: this.fb.array([this.createEmailControl()]),
    });

    this.competenceForm = this.fb.group({
      competences: this.fb.array([], minCompetencesValidator(3)),
    });

    this.userWithAddressForm = this.fb.group({
      nom:    ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email:  ['', [Validators.required, Validators.email]],
      adresse: this.fb.group({
        rue:        ['', Validators.required],
        codePostal: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        ville:      ['', Validators.required],
        pays:       ['Tunisie', Validators.required],
      }),
    });

    this.multiAddressForm = this.fb.group({
      nom:      ['', [Validators.required, Validators.minLength(2)]],
      prenom:   ['', [Validators.required, Validators.minLength(2)]],
      adresses: this.fb.array([this.createAddressGroup()], minAddressesValidator(1)),
    });
  }

  setTab(tab: typeof this.activeTab): void { this.activeTab = tab; }

  private showToast(msg: string): void {
    this.toast = msg;
    setTimeout(() => this.toast = null, 3000);
  }

  // ── Input helpers ────────────────────────────────────────

  /** Bloque toute touche qui n'est pas un chiffre (0-9) */
  onlyDigits(event: KeyboardEvent): boolean {
    return /^[0-9]$/.test(event.key);
  }

  /** Clamp immédiat du niveau entre 1 et 5 et sync avec le FormControl */
  clampNiveau(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    if (isNaN(val)) return;
    if (val < 1) val = 1;
    if (val > 5) val = 5;
    input.value = String(val);
    this.competences.at(index).get('niveau')?.setValue(val, { emitEvent: false });
  }

  // ── Emails ───────────────────────────────────────────────

  createEmailControl(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type:  ['personnel', Validators.required],
    });
  }

  get emails(): FormArray { return this.emailForm.get('emails') as FormArray; }
  addEmail(): void              { this.emails.push(this.createEmailControl()); }
  removeEmail(i: number): void  { this.emails.removeAt(i); }

  onSubmitEmails(): void {
    if (this.emailForm.invalid) { this.emailForm.markAllAsTouched(); return; }
    this.http.post('http://localhost:3000/emails', this.emailForm.value).subscribe({
      next: () => {
        this.showToast('Emails sauvegardés avec succès !');
        this.emailForm.reset();
        while (this.emails.length > 1) this.emails.removeAt(1);
      },
      error: () => this.showToast('Erreur lors de la sauvegarde.'),
    });
  }

  resetEmailForm(): void {
    this.emailForm.reset();
    while (this.emails.length > 1) this.emails.removeAt(1);
  }

  // ── Compétences ──────────────────────────────────────────

  createCompetenceControl(): FormGroup {
    return this.fb.group({
      nom:    ['', Validators.required],
      niveau: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  get competences(): FormArray { return this.competenceForm.get('competences') as FormArray; }
  addCompetence(): void             { this.competences.push(this.createCompetenceControl()); }
  removeCompetence(i: number): void { this.competences.removeAt(i); }

  onSubmitCompetences(): void {
    if (this.competenceForm.invalid) { this.competenceForm.markAllAsTouched(); return; }
    this.http.post('http://localhost:3000/competences', this.competenceForm.value).subscribe({
      next: () => {
        this.showToast('Compétences sauvegardées avec succès !');
        this.competenceForm.reset();
        while (this.competences.length > 0) this.competences.removeAt(0);
      },
      error: () => this.showToast('Erreur lors de la sauvegarde.'),
    });
  }

  // ── Adresse imbriquée ────────────────────────────────────

  get adresse(): FormGroup {
    return this.userWithAddressForm.get('adresse') as FormGroup;
  }

  onSubmitUserWithAddress(): void {
    if (this.userWithAddressForm.invalid) { this.userWithAddressForm.markAllAsTouched(); return; }
    this.http.post('http://localhost:3000/users-adresse', this.userWithAddressForm.value).subscribe({
      next: () => {
        this.showToast('Utilisateur sauvegardé avec succès !');
        this.userWithAddressForm.reset();
        this.userWithAddressForm.get('adresse.pays')?.setValue('Tunisie');
      },
      error: () => this.showToast('Erreur lors de la sauvegarde.'),
    });
  }

  resetUserWithAddressForm(): void {
    this.userWithAddressForm.reset();
    this.userWithAddressForm.get('adresse.pays')?.setValue('Tunisie');
  }

  // ── Adresses multiples ───────────────────────────────────

  createAddressGroup(): FormGroup {
    return this.fb.group({
      type:       ['domicile', Validators.required],
      rue:        ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      ville:      ['', Validators.required],
    });
  }

  get adresses(): FormArray { return this.multiAddressForm.get('adresses') as FormArray; }
  addAddress(): void              { this.adresses.push(this.createAddressGroup()); }
  removeAddress(i: number): void  { this.adresses.removeAt(i); }

  onSubmitMultiAddress(): void {
    if (this.multiAddressForm.invalid) { this.multiAddressForm.markAllAsTouched(); return; }
    this.http.post('http://localhost:3000/users-adresses', this.multiAddressForm.value).subscribe({
      next: () => {
        this.showToast('Adresses sauvegardées avec succès !');
        this.multiAddressForm.reset();
        while (this.adresses.length > 1) this.adresses.removeAt(1);
        this.adresses.at(0).reset({ type: 'domicile' });
      },
      error: () => this.showToast('Erreur lors de la sauvegarde.'),
    });
  }

  resetMultiAddressForm(): void {
    this.multiAddressForm.reset();
    while (this.adresses.length > 1) this.adresses.removeAt(1);
    this.adresses.at(0).reset({ type: 'domicile' });
  }
}
