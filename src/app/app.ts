import { Component } from '@angular/core';
import { ProjectList } from './project-list/project-list';
import { ProjectKanban } from './project-kanban/project-kanban';
import { AddProject } from './add-project/add-project';
import { EditProject } from './edit-project/edit-project';
import { Project } from './project-list/project-list';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ProjectList, ProjectKanban, AddProject, EditProject,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Project';
  showAddModal = false;
  selectedProject: Project | null = null;
  projects: Project[] = [];
  view: 'list' | 'kanban' = 'list';

  openAddModal() {
    this.showAddModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeAddModal() {
    this.showAddModal = false;
    document.body.style.overflow = '';
  }

  onProjectAdded(project: Project) {
    this.projects = [...this.projects, project];
    this.closeAddModal();
  }

  onProjectsLoaded(projects: Project[]) {
    this.projects = projects;
  }

  onEditProject(project: Project) {
    this.selectedProject = { ...project };
  }

  onCancelEdit() {
    this.selectedProject = null;
  }

  onSaveEdit(updatedProject: Project) {
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = { ...updatedProject };
      this.projects = [...this.projects];
    }
    this.selectedProject = null;
  }
}
