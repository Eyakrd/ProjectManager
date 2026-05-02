import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../project-list/project-list';
import { ProjectService } from '../project-service';

@Component({
  selector: 'app-project-kanban',
  imports: [CommonModule],
  templateUrl: './project-kanban.html',
  styleUrl: './project-kanban.css'
})
export class ProjectKanban implements OnInit {
  @Input() projects: Project[] = [];
  @Output() projectsChange = new EventEmitter<Project[]>();
  @Output() editProject = new EventEmitter<Project>();

  draggedId: string | null = null;
  dragOverCol: string | null = null;

  columns = [
    { status: 'En attente', key: 'wait' },
    { status: 'En cours',   key: 'prog' },
    { status: 'Terminé',    key: 'done' },
  ];

  private colorCache = new Map<string, string>();
  private avatarColors = ['av-0','av-1','av-2','av-3','av-4','av-5','av-6','av-7'];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    if (!this.projects.length) {
      this.projectService.getProjects().subscribe(data => {
        this.projects = data;
        this.projectsChange.emit(this.projects);
      });
    }
  }

  getByStatus(status: string): Project[] {
    return this.projects.filter(p => p.status === status);
  }

  getCount(status: string): number {
    return this.projects.filter(p => p.status === status).length;
  }

  getInitials(name: string): string {
    return name?.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
  }

  getAvatarColor(name: string): string {
    if (!this.colorCache.has(name)) {
      const idx = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % this.avatarColors.length;
      this.colorCache.set(name, this.avatarColors[idx]);
    }
    return this.colorCache.get(name)!;
  }

  onDragStart(project: Project): void {
    this.draggedId = project.id;
  }

  onDragOver(event: DragEvent, status: string): void {
    event.preventDefault();
    this.dragOverCol = status;
  }

  onDragLeave(): void {
    this.dragOverCol = null;
  }

  onDrop(event: DragEvent, newStatus: string): void {
    event.preventDefault();
    this.dragOverCol = null;
    if (!this.draggedId) return;

    const idx = this.projects.findIndex(p => p.id === this.draggedId);
    if (idx === -1 || this.projects[idx].status === newStatus) {
      this.draggedId = null;
      return;
    }

    // 1. Calculer le nouveau progress selon le status
    const newProgress =
      newStatus === 'Terminé'    ? 100 :
        newStatus === 'En attente' ? 0   :
          this.projects[idx].progress;

    // 2. Construire le projet mis à jour
    const updatedProject: Project = {
      ...this.projects[idx],
      status: newStatus,
      progress: newProgress
    };

    // 3. Optimistic update (UI réagit immédiatement)
    this.projects[idx] = updatedProject;
    this.projects = [...this.projects];
    this.projectsChange.emit(this.projects);

    // 4. Persister sur json-server ← le fix principal
    this.projectService.updateProject(updatedProject).subscribe({
      error: () => {
        // Rollback si l'API échoue
        this.projects[idx] = { ...updatedProject, status: this.projects[idx].status };
        this.projects = [...this.projects];
        this.projectsChange.emit(this.projects);
        console.error('Échec de la mise à jour du statut');
      }
    });

    this.draggedId = null;
  }

  onDragEnd(): void {
    this.draggedId = null;
    this.dragOverCol = null;
  }
}
