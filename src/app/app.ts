import { Component, signal } from '@angular/core';
import {ProjectList} from './project-list/project-list';
import { AddProject } from './add-project/add-project';

@Component({
  selector: 'app-root',
  imports: [ProjectList,AddProject],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showForm: boolean = false;
  protected readonly title = signal('Project');
}
