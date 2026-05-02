# Guide d'utilisation - ValidationService et ShowErrorDirective

## Vue d'ensemble

Ce guide explique comment utiliser le `ValidationService` et la directive `ShowErrorDirective` pour gérer la validation des formulaires de manière centralisée et réutilisable.

---

## 1. ValidationService

### Description
`ValidationService` est un service centralisé qui gère tous les messages d'erreur de validation. Il fournit des méthodes pour afficher les messages appropriés selon le type d'erreur.

### Installation

Le service est fourni au niveau racine (`providedIn: 'root'`).

```typescript
import { ValidationService } from './validation.service';

export class MyComponent {
  constructor(public validationService: ValidationService) {}
}
```

### Méthodes principales

#### 1. `getErrorMessage(control: AbstractControl | null): string`
Retourne le message d'erreur approprié pour un contrôle.

```typescript
// Dans le composant
get errorMsg(): string {
  return this.validationService.getErrorMessage(this.form.get('email'));
}
```

```html
<!-- Dans le template -->
@if (form.get('email')?.invalid && form.get('email')?.touched) {
  <span>{{ validationService.getErrorMessage(form.get('email')) }}</span>
}
```

#### 2. `hasError(control: AbstractControl | null, errorType: string): boolean`
Vérifie si un contrôle a une erreur spécifique ET est touché.

```html
@if (validationService.hasError(form.get('email'), 'required')) {
  <span>Email requis</span>
}
```

#### 3. `isInvalid(control: AbstractControl | null): boolean`
Vérifie si un contrôle est invalide ET touché (pratique pour ajouter la classe CSS `is-invalid`).

```html
<input 
  formControlName="email"
  [class.is-invalid]="validationService.isInvalid(form.get('email'))"
/>
```

#### 4. `isValid(control: AbstractControl | null): boolean`
Vérifie si un contrôle est valide ET touché (pratique pour ajouter la classe CSS `is-valid`).

```html
<input 
  formControlName="email"
  [class.is-valid]="validationService.isValid(form.get('email'))"
/>
```

### Erreurs supportées

Le service gère automatiquement les messages pour :
- `required` : "Ce champ est requis."
- `email` : "Format d'email invalide."
- `minlength` : "Minimum X caractères (Y actuels)."
- `maxlength` : "Maximum X caractères."
- `min` : "Valeur minimale : X."
- `max` : "Valeur maximale : X."
- `pattern` : "Format invalide."
- `passwordStrength` : Messages détaillés pour chaque critère
- `mustMatch` : "Les valeurs ne correspondent pas."
- `emailExists` : "Cet email est déjà utilisé."
- `minCompetences` : "Minimum X éléments requis (Y actuels)."
- `minAddresses` : "Au moins une adresse est requise."

---

## 2. ShowErrorDirective

### Description
`ShowErrorDirective` est une directive structurelle personnalisée qui affiche ou cache un template selon qu'un contrôle a une erreur spécifique.

### Utilisation

#### Syntaxe de base

```html
<span *appShowError="control; errorType: 'required'">
  Champ requis
</span>
```

#### Avec le template local

```html
<ng-template #emailError>
  <span>Format d'email invalide</span>
</ng-template>

<input 
  formControlName="email"
  [class.is-invalid]="form.get('email')?.hasError('email')"
/>

<ng-container 
  *appShowError="form.get('email'); errorType: 'email'"
  [ngTemplateOutlet]="emailError">
</ng-container>
```

#### Syntaxe complète

```html
@if (form.get('email')?.touched) {
  <span *appShowError="form.get('email'); errorType: 'required'">
    Email requis
  </span>
  <span *appShowError="form.get('email'); errorType: 'email'">
    Format invalide
  </span>
}
```

### Fonctionnement

1. La directive s'abonne à `statusChanges` et `valueChanges` du contrôle
2. Crée ou détruit le template d'erreur dynamiquement selon l'état
3. Détecte automatiquement les validateurs asynchrones
4. Se nettoie automatiquement à la destruction du composant

---

## 3. Exemple complet

### Composant TypeScript

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationService } from './validation.service';
import { ShowErrorDirective } from './directives/show-error.directive';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShowErrorDirective],
  template: `...`,
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(18)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
}
```

### Template HTML

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">

  <!-- Champ Nom -->
  <div class="field">
    <label>Nom</label>
    <input 
      type="text" 
      formControlName="nom"
      [class.is-invalid]="validationService.isInvalid(form.get('nom'))"
      [class.is-valid]="validationService.isValid(form.get('nom'))"
    />
    @if (validationService.isInvalid(form.get('nom'))) {
      <div class="errors">
        <span>{{ validationService.getErrorMessage(form.get('nom')) }}</span>
      </div>
    }
  </div>

  <!-- Champ Email -->
  <div class="field">
    <label>Email</label>
    <input 
      type="email" 
      formControlName="email"
      [class.is-invalid]="validationService.isInvalid(form.get('email'))"
      [class.is-valid]="validationService.isValid(form.get('email'))"
    />
    @if (validationService.isInvalid(form.get('email'))) {
      <div class="errors">
        <span>{{ validationService.getErrorMessage(form.get('email')) }}</span>
      </div>
    }
  </div>

  <!-- Champ Age -->
  <div class="field">
    <label>Âge</label>
    <input 
      type="number" 
      formControlName="age"
      [class.is-invalid]="validationService.isInvalid(form.get('age'))"
      [class.is-valid]="validationService.isValid(form.get('age'))"
    />
    @if (validationService.isInvalid(form.get('age'))) {
      <div class="errors">
        <span>{{ validationService.getErrorMessage(form.get('age')) }}</span>
      </div>
    }
  </div>

  <!-- Boutons -->
  <div class="actions">
    <button type="button" (click)="form.reset()">Réinitialiser</button>
    <button type="submit" [disabled]="form.invalid">Soumettre</button>
  </div>

</form>
```

---

## 4. Utilisation avec FormArray et FormGroup imbriqué

### Exemple - Adresses multiples

```html
<div formArrayName="adresses">
  @for (addressGroup of adresses.controls; track i; let i = $index) {
    <div [formGroupName]="i">
      
      <input 
        type="text" 
        formControlName="rue"
        [class.is-invalid]="validationService.isInvalid(addressGroup.get('rue'))"
      />
      @if (validationService.isInvalid(addressGroup.get('rue'))) {
        <span>{{ validationService.getErrorMessage(addressGroup.get('rue')) }}</span>
      }

      <button 
        type="button" 
        (click)="removeAddress(i)"
        [disabled]="adresses.length === 1"
      >
        Supprimer
      </button>
      
    </div>
  }
</div>

<!-- Message d'erreur FormArray -->
@if (form.get('adresses')?.errors?.['minAddresses']) {
  <div class="warn">Au moins une adresse est requise</div>
}
```

---

## 5. Avantages

✅ **Centralisation** : Tous les messages d'erreur au même endroit
✅ **Réutilisabilité** : Utilisable dans tous les composants
✅ **Maintenabilité** : Modifier un message affecte toute l'application
✅ **Flexibilité** : Facile d'ajouter/modifier des messages
✅ **Performance** : La directive crée/détruit les éléments dynamiquement
✅ **Multilingue** : Facile d'implémenter l'internationalization (i18n)

---

## 6. Personnalisation

Pour ajouter des messages personnalisés, modifiez la méthode `getErrorMessage()` dans `validation.service.ts` :

```typescript
if (errors['custom']) {
  return 'Mon message personnalisé';
}
```

Puis utilisez-le dans votre validateur :

```typescript
myCustomValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (someCondition) {
      return { custom: true };
    }
    return null;
  };
}
```

---

## 7. Migration depuis Ancien Code

Si vous aviez du code avec des messages d'erreur en dur :

**Avant :**
```html
@if (form.get('email')?.invalid && form.get('email')?.touched) {
  <span>L'email est requis. Format invalide. Etc...</span>
}
```

**Après :**
```html
@if (validationService.isInvalid(form.get('email'))) {
  <span>{{ validationService.getErrorMessage(form.get('email')) }}</span>
}
```

---

✨ **Vous êtes maintenant prêt à utiliser le ValidationService et ShowErrorDirective !**

