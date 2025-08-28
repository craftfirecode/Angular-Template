import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService} from '../../core';
import {supabaseRealtimeFolders} from '../../supabaseRealtimeFolders';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButton, MatButtonModule} from '@angular/material/button'
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, MatButton],
  template: `
    <main>
      <h4>Todos</h4>
<!--      <button (click)="logout()">Sign out</button>-->
      <div class="flex-row">
        @for (folder of data.folderList(); track folder.id) {
          <div class="my-5 flex gap-5 items-center">
            <a class="w-full left" matButton="outlined" [href]="'protected/todos/' + folder.id">
              {{ folder.title }}
            </a>
            <button (click)="deleteFolder(folder.id)" matButton="outlined">
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
export class ProtectedComponent {
  private _bottomSheet = inject(MatBottomSheet);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  constructor(public auth: SupabaseService, public data: supabaseRealtimeFolders) {
  }

  deleteFolder = async (id: number) => {
    await this.supabase
      .from('folders')
      .delete()
      .eq('id', id)
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetNewFolder);
  }

  logout() {
    this.auth.signOut();
  }
}

@Component({
  selector: 'bottom-sheet-new-folder',
  templateUrl: 'bottom-sheet-new-folder.html',
  imports: [MatListModule, MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
})
export class BottomSheetNewFolder {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetNewFolder>>(MatBottomSheetRef);

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  profileForm = new FormGroup({
    newFolder: new FormControl('', Validators.required),
  });

  async onSubmit() {
    await this.supabase
      .from('folders')
      .insert([
        {title: this.profileForm.value.newFolder}
      ])
      .select()
    this.profileForm.reset(); // Formular nach Submit leeren
  }
}
