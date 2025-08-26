import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <main>
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()">
        <label>Email<input name="email" [(ngModel)]="email" required /></label>
        <label>Password<input name="password" type="password" [(ngModel)]="password" required /></label>
        <button type="submit">Sign up</button>
      </form>
      <p *ngIf="message">{{ message }}</p>
      <p><a routerLink="/login">Back to login</a></p>
    </main>
  `
})
export class RegisterComponent {
  email = '';
  password = '';
  message: string | null = null;

  constructor(private auth: SupabaseService, private router: Router) {}

  async onSubmit() {
    const res = await this.auth.signUp(this.email, this.password);
    if (res.error) {
      this.message = res.error.message;
      return;
    }
    this.message = 'Check your email for confirmation (if enabled). You can now login.';
    // optionally navigate to login
    this.router.navigate(['/login']);
  }
}
