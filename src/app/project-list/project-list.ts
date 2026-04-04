import {Component} from '@angular/core';
import {Task, TaskList} from '../task-list/task-list';
import {CommonModule} from '@angular/common';
import {ProjectDetail} from '../project-detail/project-detail';
import {FormsModule} from '@angular/forms';

export interface Project {
  id: string,
  name: string,
  description: string,
  priority: string,
  status: string,
  startDate: string,
  dueDate: string,
  progress: number,
  owner: string,
  team: string[],
  tags: string[],
  budget: number,
  tasks:Task[] ,
}
@Component({
  selector: 'app-project-list',
  imports: [
    TaskList, CommonModule, ProjectDetail,FormsModule
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  projects:Project[] = [
    {
      id: 'PRJ-001',
      name: 'E-Commerce Platform Redesign',
      description: 'Complete overhaul of the customer-facing e-commerce platform with modern UI/UX',
      status: 'En cours',
      priority: 'Haute',
      startDate: '2024-01-15',
      dueDate: '2024-04-30',
      progress: 45,
      owner: 'Marie Dubois',
      team: ['Marie Dubois', 'Jean Martin', 'Sophie Laurent'],
      tags: ['frontend', 'ui/ux', 'critical'],
      budget: 50000,
      tasks: [
        {
          id: 'TASK-001',
          title: 'Design system creation',
          description: 'Create a comprehensive design system with components library',
          priority: 'Haute',
          status: 'Terminé',
          assignee: 'Sophie Laurent',
          estimatedHours: 40,
          actualHours: 38,
          startDate: '2024-01-15',
          dueDate: '2024-02-01',
          completedDate: '2024-01-30',
          tags: ['design', 'ui']
        },
        {
          id: 'TASK-002',
          title: 'Homepage responsive implementation',
          description: 'Implement responsive homepage using Angular and the new design system',
          priority: 'Haute',
          status: 'En cours',
          assignee: 'Jean Martin',
          estimatedHours: 32,
          actualHours: 20,
          startDate: '2024-02-01',
          dueDate: '2024-02-20',
          tags: ['frontend', 'angular']
        },
        {
          id: 'TASK-003',
          title: 'Product catalog optimization',
          description: 'Optimize product listing and filtering performance',
          priority: 'Moyenne',
          status: 'En attente',
          assignee: 'Marie Dubois',
          estimatedHours: 24,
          startDate: '2024-02-15',
          dueDate: '2024-03-05',
          tags: ['frontend', 'performance']
        },
        {
          id: 'TASK-004',
          title: 'Shopping cart refactoring',
          description: 'Refactor shopping cart with state management',
          priority: 'Haute',
          status: 'En attente',
          assignee: 'Jean Martin',
          estimatedHours: 28,
          startDate: '2024-02-20',
          dueDate: '2024-03-10',
          tags: ['frontend', 'state-management']
        }
      ]
    },
    {
      id: 'PRJ-002',
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android with offline capabilities',
      status: 'En cours',
      priority: 'Haute',
      startDate: '2024-02-01',
      dueDate: '2024-06-30',
      progress: 25,
      owner: 'Thomas Bernard',
      team: ['Thomas Bernard', 'Claire Petit', 'Lucas Roux'],
      tags: ['mobile', 'ios', 'android'],
      budget: 75000,
      tasks: [
        {
          id: 'TASK-005',
          title: 'Authentication module',
          description: 'Implement secure authentication with biometric support',
          priority: 'Haute',
          status: 'En cours',
          assignee: 'Thomas Bernard',
          estimatedHours: 35,
          actualHours: 18,
          startDate: '2024-02-01',
          dueDate: '2024-02-25',
          tags: ['security', 'authentication']
        },
        {
          id: 'TASK-006',
          title: 'Offline data sync',
          description: 'Implement local database and sync mechanism',
          priority: 'Moyenne',
          status: 'En attente',
          assignee: 'Claire Petit',
          estimatedHours: 45,
          startDate: '2024-02-20',
          dueDate: '2024-03-20',
          tags: ['database', 'sync']
        },
        {
          id: 'TASK-007',
          title: 'Push notifications setup',
          description: 'Configure Firebase Cloud Messaging for notifications',
          priority: 'Basse',
          status: 'En attente',
          assignee: 'Lucas Roux',
          estimatedHours: 16,
          startDate: '2024-03-01',
          dueDate: '2024-03-15',
          tags: ['notifications', 'firebase']
        }
      ]
    },
    {
      id: 'PRJ-003',
      name: 'API Migration to Microservices',
      description: 'Migrate monolithic API to microservices architecture',
      status: 'En cours',
      priority: 'Moyenne',
      startDate: '2024-01-10',
      dueDate: '2024-05-15',
      progress: 60,
      owner: 'Antoine Moreau',
      team: ['Antoine Moreau', 'Emma Fournier', 'Paul Girard'],
      tags: ['backend', 'microservices', 'architecture'],
      budget: 60000,
      tasks: [
        {
          id: 'TASK-008',
          title: 'Service decomposition analysis',
          description: 'Analyze and plan microservices boundaries',
          priority: 'Haute',
          status: 'Terminé',
          assignee: 'Antoine Moreau',
          estimatedHours: 30,
          actualHours: 32,
          startDate: '2024-01-10',
          dueDate: '2024-01-25',
          completedDate: '2024-01-26',
          tags: ['architecture', 'planning']
        },
        {
          id: 'TASK-009',
          title: 'User service implementation',
          description: 'Implement and deploy user management microservice',
          priority: 'Haute',
          status: 'Terminé',
          assignee: 'Emma Fournier',
          estimatedHours: 50,
          actualHours: 48,
          startDate: '2024-01-26',
          dueDate: '2024-02-20',
          completedDate: '2024-02-18',
          tags: ['backend', 'node.js']
        },
        {
          id: 'TASK-010',
          title: 'Product service implementation',
          description: 'Create product catalog microservice',
          priority: 'Haute',
          status: 'En cours',
          assignee: 'Paul Girard',
          estimatedHours: 45,
          actualHours: 30,
          startDate: '2024-02-15',
          dueDate: '2024-03-10',
          tags: ['backend', 'database']
        },
        {
          id: 'TASK-011',
          title: 'API Gateway setup',
          description: 'Configure and deploy API Gateway',
          priority: 'Moyenne',
          status: 'En attente',
          assignee: 'Antoine Moreau',
          estimatedHours: 25,
          startDate: '2024-03-05',
          dueDate: '2024-03-25',
          tags: ['infrastructure', 'gateway']
        }
      ]
    },
    {
      id: 'PRJ-004',
      name: 'Data Analytics Dashboard',
      description: 'Business intelligence dashboard with real-time analytics',
      status: 'Terminé',
      priority: 'Moyenne',
      startDate: '2023-11-01',
      dueDate: '2024-01-31',
      progress: 100,
      owner: 'Camille Leroy',
      team: ['Camille Leroy', 'Hugo Martinez'],
      tags: ['analytics', 'visualization', 'bi'],
      budget: 35000,
      tasks: [
        {
          id: 'TASK-012',
          title: 'Data warehouse design',
          description: 'Design and implement data warehouse schema',
          priority: 'Haute',
          status: 'Terminé',
          assignee: 'Camille Leroy',
          estimatedHours: 40,
          actualHours: 42,
          startDate: '2023-11-01',
          dueDate: '2023-11-20',
          completedDate: '2023-11-21',
          tags: ['database', 'design']
        },
        {
          id: 'TASK-013',
          title: 'Chart components development',
          description: 'Create reusable chart components with D3.js',
          priority: 'Haute',
          status: 'Terminé',
          assignee: 'Hugo Martinez',
          estimatedHours: 35,
          actualHours: 38,
          startDate: '2023-11-20',
          dueDate: '2023-12-15',
          completedDate: '2023-12-14',
          tags: ['frontend', 'visualization']
        },
        {
          id: 'TASK-014',
          title: 'Real-time data pipeline',
          description: 'Setup WebSocket connection for live data updates',
          priority: 'Moyenne',
          status: 'Terminé',
          assignee: 'Camille Leroy',
          estimatedHours: 28,
          actualHours: 30,
          startDate: '2023-12-10',
          dueDate: '2024-01-10',
          completedDate: '2024-01-08',
          tags: ['backend', 'websocket']
        },
        {
          id: 'TASK-015',
          title: 'Export functionality',
          description: 'Add PDF and Excel export capabilities',
          priority: 'Basse',
          status: 'Terminé',
          assignee: 'Hugo Martinez',
          estimatedHours: 20,
          actualHours: 18,
          startDate: '2024-01-10',
          dueDate: '2024-01-25',
          completedDate: '2024-01-23',
          tags: ['export', 'reporting']
        }
      ]
    },
    {
      id: 'PRJ-005',
      name: 'Security Audit & Compliance',
      description: 'Complete security audit and GDPR compliance implementation',
      status: 'En attente',
      priority: 'Haute',
      startDate: '2024-03-01',
      dueDate: '2024-05-31',
      progress: 0,
      owner: 'Isabelle Vincent',
      team: ['Isabelle Vincent', 'Nicolas Garnier'],
      tags: ['security', 'compliance', 'gdpr'],
      budget: 45000,
      tasks: [
        {
          id: 'TASK-016',
          title: 'Security vulnerability assessment',
          description: 'Conduct comprehensive security audit',
          priority: 'Haute',
          status: 'En attente',
          assignee: 'Isabelle Vincent',
          estimatedHours: 50,
          startDate: '2024-03-01',
          dueDate: '2024-03-20',
          tags: ['security', 'audit']
        },
        {
          id: 'TASK-017',
          title: 'GDPR compliance review',
          description: 'Review and update privacy policies and data handling',
          priority: 'Haute',
          status: 'En attente',
          assignee: 'Nicolas Garnier',
          estimatedHours: 40,
          startDate: '2024-03-10',
          dueDate: '2024-04-05',
          tags: ['compliance', 'legal']
        },
        {
          id: 'TASK-018',
          title: 'Penetration testing',
          description: 'External penetration testing engagement',
          priority: 'Moyenne',
          status: 'En attente',
          assignee: 'Isabelle Vincent',
          estimatedHours: 30,
          startDate: '2024-04-01',
          dueDate: '2024-04-20',
          tags: ['security', 'testing']
        }
      ]
    },
    {
      id: 'PRJ-006',
      name: 'DevOps Infrastructure Upgrade',
      description: 'Modernize CI/CD pipeline and cloud infrastructure',
      status: 'En cours',
      priority: 'Moyenne',
      startDate: '2024-01-20',
      dueDate: '2024-04-15',
      progress: 35,
      owner: 'Olivier Blanc',
      team: ['Olivier Blanc', 'Julie Simon'],
      tags: ['devops', 'infrastructure', 'cloud'],
      budget: 40000,
      tasks: [
        {
          id: 'TASK-019',
          title: 'Kubernetes cluster setup',
          description: 'Setup production-ready Kubernetes cluster',
          priority: 'Haute',
          status: 'Terminé',
          assignee: 'Olivier Blanc',
          estimatedHours: 45,
          actualHours: 50,
          startDate: '2024-01-20',
          dueDate: '2024-02-10',
          completedDate: '2024-02-12',
          tags: ['kubernetes', 'infrastructure']
        },
        {
          id: 'TASK-020',
          title: 'CI/CD pipeline automation',
          description: 'Implement automated testing and deployment',
          priority: 'Haute',
          status: 'En cours',
          assignee: 'Julie Simon',
          estimatedHours: 35,
          actualHours: 22,
          startDate: '2024-02-05',
          dueDate: '2024-03-01',
          tags: ['ci/cd', 'automation']
        },
        {
          id: 'TASK-021',
          title: 'Monitoring and logging',
          description: 'Setup comprehensive monitoring with Prometheus and Grafana',
          priority: 'Moyenne',
          status: 'En attente',
          assignee: 'Olivier Blanc',
          estimatedHours: 28,
          startDate: '2024-03-01',
          dueDate: '2024-03-25',
          tags: ['monitoring', 'observability']
        }
      ]
    }
  ];
  selectedProject:any = null;
  searchTerm: string ='';
  get filteredProjects() {
    if(!this.searchTerm.trim())return  this.projects;
    const term=this.searchTerm.toLowerCase();
    return  this.projects.filter(project =>
    project.name.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.owner.toLowerCase().includes(term) ||
        project.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  onVoirDetails(project:Project) {


    this.selectedProject = this.selectedProject?.id === project.id ? null : project;



  }
}
