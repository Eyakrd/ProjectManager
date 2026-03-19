import {Directive, OnChanges, Input, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[apphighlightStatus]',
  standalone: true,
})
export class HighlightStatus implements OnChanges {

  constructor(private el: ElementRef,private renderer: Renderer2) {
  }

  @Input('apphighlightStatus') status: string='';
  ngOnChanges(): void {
        this.applyColor();
    }

  private applyColor() {
    let backgroundColor = '';
    let textColor='';
    switch (this.status){
      case 'Terminé':
        backgroundColor = '#dcfce7';  // green-100
        textColor = '#15803d';        // green-700
        break;
      case 'En cours':
        backgroundColor = '#dbeafe';  // blue-100
        textColor = '#1d4ed8';        // blue-700
        break;
      case 'En attente':
        backgroundColor = '#ffedd5';  // orange-100 ✅
        textColor = '#c2410c';        // orange-700 ✅
        break;
      default:
        backgroundColor = '#f3f4f6';
        textColor = '#374151';

    }
    this.renderer.setStyle(this.el.nativeElement,'background-color', backgroundColor);
    this.renderer.setStyle(this.el.nativeElement, 'color', textColor);
  }
}
