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
    <main class="mt-5">
      <a href="/" matButton="outlined">Zurück</a>
      <div class="my-5">
        @for (todos of filteredTodos(); track todos.id) {
          <div class="my-5 flex gap-5 items-center">
            <button class="w-full left" matButton="outlined">{{ todos.title }}</button>
              <button matButton="outlined" (click)="deleteTodo(todos.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-trash-icon lucide-trash">
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                  <path d="M3 6h18"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
        }
      </div>
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
