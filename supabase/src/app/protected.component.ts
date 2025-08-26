import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <h2>Protected Area</h2>
      <p *ngIf="auth.user()">Welcome {{ auth.user()?.email }}</p>
      <button (click)="logout()">Sign out</button>
    </main>
  `
})
export class ProtectedComponent {
  constructor(public auth: SupabaseService) {}

  logout() {
    this.auth.signOut();
  }
}
