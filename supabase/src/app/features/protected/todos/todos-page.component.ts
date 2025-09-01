import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService} from '../../../core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {supabaseRealtimeTodos} from '../../../supabaseRealtimeTodos';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {createClient} from '@supabase/supabase-js';
import {FolderService} from '../../../folder.service';
import {BottomSheetNewTodo} from './BottomSheetNewTodo';
import {MatButton, MatFabButton} from '@angular/material/button';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule, MatButton, MatFabButton, RouterLink],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodosPageComponent {
  private folderService = inject(FolderService);
  private route = inject(ActivatedRoute);
  private _bottomSheet = inject(MatBottomSheet);
  public data = inject(supabaseRealtimeTodos);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  filteredTodos = computed(() => {
    return this.data.todoList()
  });

  async toggleCompleted(ref: any, state: any): Promise<void> {
    if (state === null || state === false) {
      await this.supabase
        .from('todos')
        .update({ completed: true })
        .eq('id', ref.id)
    }

    if (state === true) {
      await this.supabase
        .from('todos')
        .update({ completed: false })
        .eq('id', ref.id)
    }
  }

  constructor() {
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
