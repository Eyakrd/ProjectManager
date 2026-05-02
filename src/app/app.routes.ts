import { Routes } from '@angular/router';
import {ContactFormComponent} from './contact-form/contact-form';
import {ProjectList} from './project-list/project-list';
import {Home} from './home/home';
import {DynamicForm} from './dynamic-form/dynamic-form';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: Home },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'dynamic-form',  component: DynamicForm },
  { path: '**', redirectTo: 'projects' }

];
