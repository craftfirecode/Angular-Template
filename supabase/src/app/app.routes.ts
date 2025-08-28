import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { ProtectedComponent } from './features/protected/protected.component';
import { authGuard, guestGuard } from './core';
import {FoldersPageComponent} from './features/protected/folders-page.component';
import {TodosPageComponent} from './features/protected/todos-page.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [guestGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
	{ path: 'protected/folders', component: FoldersPageComponent, canActivate: [authGuard] },
	{ path: 'protected/todos/:id', component: TodosPageComponent, canActivate: [authGuard] },
	{ path: '', redirectTo: 'protected', pathMatch: 'full' },
	{ path: '**', redirectTo: 'protected' }
];
