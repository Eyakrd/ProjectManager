import { Showerror } from './showerror';
import { TemplateRef, ViewContainerRef } from '@angular/core';

describe('Showerror', () => {
  it('should create an instance', () => {
    const mockTemplateRef = {} as TemplateRef<void>;
    const mockViewContainerRef = { createEmbeddedView: () => {}, clear: () => {} } as any;
    const directive = new Showerror(mockTemplateRef, mockViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
