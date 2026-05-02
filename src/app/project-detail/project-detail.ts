import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskListComponent} from '../task-list/task-list';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, TaskListComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  @Input() project:any = null;

}
