import {Routes} from '@angular/router';
import {DashbaordComponent} from './pages/dashbaord/dashbaord.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashbaordComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];
