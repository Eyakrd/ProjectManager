import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appShowerror]',
})
export class Showerror implements OnInit, OnDestroy {

  private control: AbstractControl | null = null;
  private errorType: string = 'required';
  private destroy$ = new Subject<void>();
  private hasView = false;

  @Input()
  set appShowError(control: AbstractControl | null) {
    this.control = control;
  }

  @Input()
  set appShowErrorType(type: string) {
    this.errorType = type;
  }

  constructor(
    private templateRef: TemplateRef<void>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.control) {
      // Afficher initialement selon l'état
      this.updateView();

      // S'abonner aux changements de statut
      this.control.statusChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.updateView());

      // S'abonner aussi aux changements de valeur pour les validateurs asynchrones
      this.control.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.updateView());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateView(): void {
    if (!this.control) {
      return;
    }

    const shouldShow = this.control.hasError(this.errorType) && this.control.touched;

    if (shouldShow && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!shouldShow && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

