import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <h2>Todos Page</h2>
      <p *ngIf="auth.user()">Willkommen {{ auth.user()?.email }}</p>
      <p>Aktuelle ID: {{ id }}</p>
    </main>
  `
})
export class TodosPageComponent {
  id: string | null = null;
  constructor(public auth: SupabaseService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
}
