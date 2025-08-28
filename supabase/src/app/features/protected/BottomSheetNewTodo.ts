import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../core';
import { createClient } from '@supabase/supabase-js';
import {MatButton} from '@angular/material/button'
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FolderService} from '../../folder.service';


@Component({
  selector: 'bottom-sheet-new-todo',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatLabel, MatFormField, MatInput],
  templateUrl: 'bottom-sheet-new-todo.html',
})
export class BottomSheetNewTodo {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  private _bottomSheetRef = inject(MatBottomSheetRef<BottomSheetNewTodo>);
  private folderService = inject(FolderService);

  profileForm = new FormGroup({
    newTodo: new FormControl('', Validators.required),
  });

  async onSubmit() {
    const folderId = this.folderService.folderID(); // Signal auslesen
    if (!folderId) return;

    await this.supabase
      .from('todos')
      .insert([{ title: this.profileForm.value.newTodo, folder_id: +folderId }])
      .select();

    this.profileForm.reset();
    this._bottomSheetRef.dismiss();
  }
}
