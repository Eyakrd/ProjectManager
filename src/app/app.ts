import { Component, signal } from '@angular/core';
import {ProjectList} from './project-list/project-list';

@Component({
  selector: 'app-root',
  imports: [ProjectList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project');
}
