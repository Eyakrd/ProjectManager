import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task-list/task-list';
import { CommonModule } from '@angular/common';
import { ProjectDetail } from '../project-detail/project-detail';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../project-service';
import { RouterLink } from '@angular/router';

export interface Project {
  id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  startDate: string;
  dueDate: string;
  progress: number;
  owner: string;
  team: string[];
  tags: string[];
  budget: number;
  tasks: Task[];
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectDetail, FormsModule, RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  @Input() projects: Project[] = [];
  @Output() projectsChange = new EventEmitter<Project[]>();
  @Output() editProject = new EventEmitter<Project>();

  selectedProject: Project | null = null;
  searchTerm: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.projectsChange.emit(this.projects);
    });
  }

  get filteredProjects(): Project[] {
    const list = [...this.projects].reverse();

    if (!this.searchTerm.trim()) return list;

    const term = this.searchTerm.toLowerCase();
    return list.filter(project =>
      project.name.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.owner.toLowerCase().includes(term) ||
      project.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  onEditProject(project: Project): void {
    this.editProject.emit(project);
  }

  onVoirDetails(project: Project): void {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  onCloseModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }
}
