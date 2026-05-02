import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectKanban } from './project-kanban';

describe('ProjectKanban', () => {
  let component: ProjectKanban;
  let fixture: ComponentFixture<ProjectKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectKanban]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectKanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
