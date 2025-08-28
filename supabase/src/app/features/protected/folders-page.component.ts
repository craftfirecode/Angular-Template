import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core';

@Component({
  selector: 'app-folders-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <h2>Folders Page</h2>
      <p *ngIf="auth.user()">Willkommen {{ auth.user()?.email }}</p>
    </main>
  `
})
export class FoldersPageComponent {
  constructor(public auth: SupabaseService) {}
}

