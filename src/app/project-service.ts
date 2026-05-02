import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project-list/project-list';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProject(project: Project): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
