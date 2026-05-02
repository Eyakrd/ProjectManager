import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Service de gestion centralisée des messages d'erreur de validation
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  /**
   * Retourne le message d'erreur approprié pour un contrôle
   */
  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;

    // Erreurs génériques
    if (errors['required']) {
      return 'Ce champ est requis.';
    }

    if (errors['email']) {
      return 'Format d\'email invalide.';
    }

    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} caractères (${errors['minlength'].actualLength} actuels).`;
    }

    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} caractères.`;
    }

    if (errors['min']) {
      return `Valeur minimale : ${errors['min'].min}.`;
    }

    if (errors['max']) {
      return `Valeur maximale : ${errors['max'].max}.`;
    }

    if (errors['pattern']) {
      return 'Format invalide.';
    }

    // Erreurs personnalisées
    if (errors['passwordStrength']) {
      const pwd = errors['passwordStrength'];
      const messages: string[] = [];
      if (pwd.tooShort) messages.push('Au moins 8 caractères');
      if (pwd.noUppercase) messages.push('Au moins une majuscule');
      if (pwd.noLowercase) messages.push('Au moins une minuscule');
      if (pwd.noNumber) messages.push('Au moins un chiffre');
      if (pwd.noSpecial) messages.push('Au moins un caractère spécial');
      return messages.join(', ') + '.';
    }

    if (errors['mustMatch']) {
      return 'Les valeurs ne correspondent pas.';
    }

    if (errors['emailExists']) {
      return 'Cet email est déjà utilisé.';
    }

    if (errors['minCompetences']) {
      const { required, actual } = errors['minCompetences'];
      return `Minimum ${required} éléments requis (${actual} actuels).`;
    }

    if (errors['minAddresses']) {
      return 'Au moins une adresse est requise.';
    }

    // Erreur générique
    return 'Erreur de validation.';
  }

  /**
   * Vérifie si un contrôle a une erreur spécifique et est touché
   */
  hasError(control: AbstractControl | null, errorType: string): boolean {
    if (!control) {
      return false;
    }
    return control.hasError(errorType) && control.touched;
  }

  /**
   * Vérifie si un contrôle est invalide et touché
   */
  isInvalid(control: AbstractControl | null): boolean {
    if (!control) {
      return false;
    }
    return control.invalid && control.touched;
  }

  /**
   * Vérifie si un contrôle est valide et touché
   */
  isValid(control: AbstractControl | null): boolean {
    if (!control) {
      return false;
    }
    return control.valid && control.touched;
  }
}

