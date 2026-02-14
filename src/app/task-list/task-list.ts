import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

export interface Task {
  id: string,
  title: string,
  description: string,
  priority: 'Haute' | 'Basse' |'Moyenne',
  status: 'En attente'| 'En cours'|'Terminé',
  assignee: string,
  estimatedHours: number,
  actualHours?: number,
  startDate: string,
  dueDate: string,
  completedDate?: string,
  tags: string[],
}

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})

export class TaskList {
  @Input() tasks:Task[]=[];

  getStatusColor(status:string):string{
    const colors:Record<string, string>={
      'En attente':'blob-yellow',
      'En cours':'blob-orange',
      'Terminé':'blob-green',
    };
    return colors[status] || 'blob-gray';
  }
}

