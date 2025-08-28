import {Component, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupabaseService} from '../../core';
import {ActivatedRoute} from '@angular/router';
import {supabaseRealtimeTodos} from '../../supabaseRealtimeTodos';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <h2>Todos Page</h2>
      <p *ngIf="auth.user()">Willkommen {{ auth.user()?.email }}</p>
      <p>Aktuelle ID: {{ id }}</p>

      <ul>
        @for (todos of filteredTodos(); track todos.id) {
          <li>
            <a [href]="'protected/todos/' + todos.id">{{ todos.id }} – {{ todos.title }}</a>
          </li>
        }
      </ul>
    </main>
  `
})
export class TodosPageComponent {
  id: string | null = null;

  // computed Signal für gefilterte Todos
  filteredTodos = computed(() => {
    if (!this.id) return [];
    return this.data.todoList().filter(todo => todo.folder_id == this.id);
  });

  constructor(
    public auth: SupabaseService,
    private route: ActivatedRoute,
    public data: supabaseRealtimeTodos
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
}
