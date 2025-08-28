import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupabaseService} from '../../core';
import {supabaseRealtimeFolders} from '../../supabaseRealtimeFolders';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, MatButton],
  template: `
    <main>
      <h2>Protected Area</h2>
      <p *ngIf="auth.user()">Welcome {{ auth.user()?.email }}</p>
      <button (click)="logout()">Sign out</button>

      <div class="flex-row">
        @for (folder of data.folderList(); track folder.id) {
          <div class="my-5">
            <a class="w-full" matButton="outlined" [href]="'protected/todos/' + folder.id">{{ folder.id }} – {{ folder.title }}</a>
          </div>
        }
      </div>
    </main>
  `
})
export class ProtectedComponent {
  constructor(public auth: SupabaseService, public data: supabaseRealtimeFolders) {}

  logout() {
    this.auth.signOut();
  }
}
