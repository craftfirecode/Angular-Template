import { Routes } from '@angular/router';
import { guestGuard, authGuard } from './core';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent),
  //   canActivate: [guestGuard]
  // },
  {
    path: 'protected',
    loadComponent: () => import('./features/protected/folder/protected.component').then(m => m.ProtectedComponent),
    canActivate: [authGuard]
  },
  {
    path: 'protected/todos/:id',
    loadComponent: () => import('./features/protected/todos/todos-page.component').then(m => m.TodosPageComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'protected', pathMatch: 'full' },
  { path: '**', redirectTo: 'protected' }
];
