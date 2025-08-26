import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <main>
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <label>Email<input name="email" [(ngModel)]="email" required /></label>
        <label>Password<input name="password" type="password" [(ngModel)]="password" required /></label>
        <button type="submit">Login</button>
      </form>
      <p *ngIf="error">{{ error }}</p>
      <p><a routerLink="/register">Register</a></p>
    </main>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: SupabaseService, private router: Router) {}

  async onSubmit() {
    this.error = null;
    const res = await this.auth.signIn(this.email, this.password);
    if (res.error) {
      this.error = res.error.message;
      return;
    }
    this.router.navigate(['/protected']);
  }
}
