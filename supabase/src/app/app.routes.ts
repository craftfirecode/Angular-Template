import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { ProtectedComponent } from './features/protected/folder/protected.component';
import { authGuard, guestGuard } from './core';
import {TodosPageComponent} from './features/protected/todos/todos-page.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [guestGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
	{ path: 'protected/todos/:id', component: TodosPageComponent, canActivate: [authGuard] },
	{ path: '', redirectTo: 'protected', pathMatch: 'full' },
	{ path: '**', redirectTo: 'protected' }
];
