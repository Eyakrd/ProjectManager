import { Component } from '@angular/core';
import { ProjectList } from '../project-list/project-list';
import { ProjectKanban } from '../project-kanban/project-kanban';
import { AddProject } from '../add-project/add-project';
import { EditProject } from '../edit-project/edit-project';
import { Project } from '../project-list/project-list';

@Component({
  selector: 'app-home',
  imports: [ProjectList, ProjectKanban, AddProject, EditProject],
  templateUrl: './home.html',
})
export class Home {
  showAddModal = false;
  selectedProject: Project | null = null;
  projects: Project[] = [];
  view: 'list' | 'kanban' = 'list';

  openAddModal() { this.showAddModal = true; document.body.style.overflow = 'hidden'; }
  closeAddModal() { this.showAddModal = false; document.body.style.overflow = ''; }
  onProjectAdded(project: Project) { this.projects = [...this.projects, project]; this.closeAddModal(); }
  onProjectsLoaded(projects: Project[]) { this.projects = projects; }
  onEditProject(project: Project) { this.selectedProject = { ...project }; }
  onCancelEdit() { this.selectedProject = null; }
  onSaveEdit(updated: Project) {
    const i = this.projects.findIndex(p => p.id === updated.id);
    if (i !== -1) this.projects[i] = { ...updated };
    this.projects = [...this.projects];
    this.selectedProject = null;
  }
}
