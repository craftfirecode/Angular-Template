import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <main>
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()">
        <label>Email<input name="email" [(ngModel)]="email" required /></label>
        <label>Username<input name="username" [(ngModel)]="username" required /></label>
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
  username = '';
  password = '';
  message: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    const res = await this.auth.signUp(this.email, this.username, this.password);
    if ((res as any).error) {
      this.message = (res as any).error.message;
      return;
    }
    this.message = 'Registrierung erfolgreich. Du kannst dich jetzt einloggen.';
    this.router.navigate(['/login']);
  }
}
