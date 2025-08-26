import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ProtectedComponent } from './protected.component';
import { authGuard } from './auth.guard';
import { guestGuard } from './guest.guard';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [guestGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
	{ path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
	{ path: '', redirectTo: 'protected', pathMatch: 'full' },
	{ path: '**', redirectTo: 'protected' }
];
