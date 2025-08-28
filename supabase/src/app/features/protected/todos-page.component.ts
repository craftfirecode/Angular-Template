import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService} from '../../core';
import {ActivatedRoute} from '@angular/router';
import {supabaseRealtimeTodos} from '../../supabaseRealtimeTodos';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButton, MatButtonModule} from '@angular/material/button'
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';


@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <main>
      <h2>Todos Page</h2>
      <p *ngIf="auth.user()">Willkommen {{ auth.user()?.email }}</p>
      <p>Aktuelle ID: {{ id }}</p>

      <ul>
        @for (todos of filteredTodos(); track todos.id) {
          <li>
            <div>
              {{ todos.id }} – {{ todos.title }}
              <button (click)="deleteTodo(todos.id)">deleteTodo</button>
            </div>
          </li>
        }
      </ul>
      <button matButton="elevated" (click)="openBottomSheet()">Open file</button>
    </main>
  `
})
export class TodosPageComponent {
  id: string | null = null;
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetNewTodo);
  }

  async deleteTodo(id: number): Promise<any> {
    await this.supabase
      .from('todos')
      .delete()
      .eq('id', id)
  }

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

@Component({
  selector: 'bottom-sheet-new-todo',
  templateUrl: 'bottom-sheet-new-todo.html',
  imports: [MatListModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
})
export class BottomSheetNewTodo {

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  profileForm = new FormGroup({
    newTodo: new FormControl('', Validators.required),
  });

  async onSubmit() {
    await this.supabase
      .from('todos')
      .insert([
        {title: this.profileForm.value.newTodo, folder_id: 27},
      ])
      .select()
    this.profileForm.reset(); // Formular nach Submit leeren
  }

  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetNewTodo>>(MatBottomSheetRef);
}
