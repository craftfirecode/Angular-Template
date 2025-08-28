import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService } from '../../../core';
import { ActivatedRoute } from '@angular/router';
import { supabaseRealtimeTodos } from '../../../supabaseRealtimeTodos';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { createClient } from '@supabase/supabase-js';
import {FolderService} from '../../../folder.service';
import {BottomSheetNewTodo} from './BottomSheetNewTodo';
import {MatButton, MatFabButton} from '@angular/material/button';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule, MatButton, MatFabButton],
  template: `
    <main class="mt-5">
      <a href="/supabase/public" matButton="outlined">Zurück</a>
      <div class="my-5">
        <div *ngFor="let todo of filteredTodos()">
          <div class="my-5 flex gap-5 items-center">
            <button class="w-full left" matButton="outlined">{{ todo.title }}</button>
            <button matButton="outlined" (click)="deleteTodo(todo.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-trash-icon lucide-trash">
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button matFab="elevated" (click)="openBottomSheet()" class="fab">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-plus-icon lucide-plus">
          <path d="M5 12h14"/>
          <path d="M12 5v14"/>
        </svg>
      </button>
    </main>
  `
})
export class TodosPageComponent {
  private folderService = inject(FolderService);
  private route = inject(ActivatedRoute);
  private _bottomSheet = inject(MatBottomSheet);
  public data = inject(supabaseRealtimeTodos);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // computed Signal für gefilterte Todos
  filteredTodos = computed(() => {
    const folderId = this.folderService.folderID();
    if (!folderId) return [];
    return this.data.todoList().filter(todo => todo.folder_id == +folderId);
  });

  constructor() {
    // FolderID aus der Route setzen
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.folderService.setFolderID(id);
    });
  }

  openBottomSheet() {
    this._bottomSheet.open(BottomSheetNewTodo);
  }

  async deleteTodo(id: number) {
    await this.supabase
      .from('todos')
      .delete()
      .eq('id', id);
  }
}
