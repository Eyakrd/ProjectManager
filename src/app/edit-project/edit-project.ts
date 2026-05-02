import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project } from '../project-list/project-list';
import {ProjectService} from '../project-service';
@Component({
  selector: 'app-edit-project',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject implements OnChanges {
  @Input() project: Project | null = null;
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<Project>();

  editableProject: Project | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnChanges() {
    if (this.project) {
      this.editableProject = { ...this.project };
    }
  }
  successMessage='';
  onSubmit(form: NgForm) {
    if (form.valid && this.editableProject) {
      this.projectService.updateProject(this.editableProject).subscribe(updated => {
        console.log('Projet mis à jour ✅', updated);
        this.successMessage = `Le projet « ${updated.name} » a été mis à jour !`;
        setTimeout(() => { this.successMessage = ''; }, 3000);
        this.saveEdit.emit(updated);  // ← manquait cette ligne !
      });
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }
}
