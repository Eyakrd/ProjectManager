import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProjectService} from '../project-service';
import {NgSelectModule} from '@ng-select/ng-select';
import {Project} from '../project-list/project-list';

export interface ProjectForm {
  name: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  budget: number | null;
  startDate: string;
  dueDate: string;
}

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject implements OnInit {

  @Output() projectAdded = new EventEmitter<Project>();
  @Output() cancelled = new EventEmitter<void>();

  successMessage = '';
  errorMessage = '';
  isSubmitting = false;
  owners: string[] = [];

  project: ProjectForm = this.getEmptyProject();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.owners = [...new Set(projects.map(p => p.owner).filter(Boolean))];
      },
      error: () => {
        this.showError('Impossible de charger la liste des responsables.');
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (new Date(this.project.dueDate) < new Date(this.project.startDate)) {
      this.showError("La date d'échéance doit être après la date de début.");
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const newProject = {
      ...this.project,
      budget: this.project.budget ?? 0,
      tasks: [],
      progress: 0,
      team: [],
      tags: [],
      id: Date.now().toString(),
    };

    this.projectService.addProject(newProject).subscribe({
      next: (saved) => {
        this.isSubmitting = false;
        // Émettre le projet sauvegardé (avec l'id retourné par json-server)
        this.projectAdded.emit(saved);
      },
      error: () => {
        this.showError('Une erreur est survenue. Veuillez réessayer.');
        this.isSubmitting = false;
      },
    });
  }

  onCancel(form: NgForm): void {
    form.resetForm();
    this.project = this.getEmptyProject();
    this.errorMessage = '';
    this.cancelled.emit();
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = ''), 4000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ''), 5000);
  }

  private getEmptyProject(): ProjectForm {
    return {
      name: '',
      description: '',
      status: '',
      priority: '',
      owner: '',
      budget: null,
      startDate: '',
      dueDate: '',
    };
  }
}
