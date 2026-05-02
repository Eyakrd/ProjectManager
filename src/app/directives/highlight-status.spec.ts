import { HighlightStatus } from './highlight-status';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightStatus', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    const mockRenderer = {} as Renderer2;
    const directive = new HighlightStatus(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
