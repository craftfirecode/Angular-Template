import {Component, inject, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from '../../../core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {supabaseRealtimeTodos} from '../../../supabaseRealtimeTodos';
import {createClient} from '@supabase/supabase-js';
import {FolderService} from '../../../folder.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, Drawer, ReactiveFormsModule, InputText],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodosPageComponent {
  private folderService = inject(FolderService);
  private route = inject(ActivatedRoute);
  public data = inject(supabaseRealtimeTodos);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>;

  fab = false;

  profileForm = new FormGroup({
    newTodo: new FormControl('', Validators.required),
  });

  async toggleCompleted(ref: any, state: any): Promise<void> {
    if (state === null || state === false) {
      await this.supabase
        .from('todos')
        .update({completed: true})
        .eq('id', ref.id)
    }

    if (state === true) {
      await this.supabase
        .from('todos')
        .update({completed: false})
        .eq('id', ref.id)
    }
  }

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.folderService.setFolderID(id);
    });
  }

  openDrawer() {
    this.fab = true;
  }

  async onSubmit() {
    const folderId = this.folderService.folderID();
    if (!folderId) return;

    await this.supabase
      .from('todos')
      .insert([{ title: this.profileForm.value.newTodo, folder_id: folderId }]);

    this.profileForm.reset();
    this.fab = true;
    setTimeout(() => this.todoInput?.nativeElement.focus(), 0);
  }

  async deleteTodo(id: number) {
        await this.supabase
          .from('todos')
          .delete()
          .eq('id', id);
    };
}
