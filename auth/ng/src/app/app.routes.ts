import { Routes } from '@angular/router';
import { guestGuard, authGuard } from './core';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./routes/auth/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./routes/auth/register.component').then(m => m.RegisterComponent),
  //   canActivate: [guestGuard]
  // },
  {
    path: 'protected',
    loadComponent: () => import('./routes/protected/folder/folders-page.component').then(m => m.FoldersPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'protected/todos/:id',
    loadComponent: () => import('./routes/protected/todos/todos-page.component').then(m => m.TodosPageComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'protected', pathMatch: 'full' },
  { path: '**', redirectTo: 'protected' }
];
