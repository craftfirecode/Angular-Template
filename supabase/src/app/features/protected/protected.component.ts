import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupabaseService} from '../../core';
import {supabaseRealtimeFolders} from '../../supabaseRealtimeFolders';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <h2>Protected Area</h2>
      <p *ngIf="auth.user()">Welcome {{ auth.user()?.email }}</p>
      <button (click)="logout()">Sign out</button>

      <ul>
        @for (folder of data.folderList(); track folder.id) {
          <li>{{ folder.id }} – {{ folder.title }}</li>
        }
      </ul>
    </main>
  `
})
export class ProtectedComponent {
  constructor(public auth: SupabaseService, public data: supabaseRealtimeFolders) {}

  logout() {
    this.auth.signOut();
  }
}
