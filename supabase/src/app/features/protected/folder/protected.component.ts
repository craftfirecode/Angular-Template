import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService } from '../../../core';
import { supabaseRealtimeFolders } from '../../../supabaseRealtimeFolders';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, MatButton, MatFabButton],
  template: `
    <main class="mt-5 pb-30">
      <div class="flex-row">
        @for (folder of data.folderList(); track folder.id) {
          <div class="my-5 flex gap-5 items-center">
            <a
              class="w-full left"
              matButton="outlined"
              [href]="'protected/todos/' + folder.id"
            >
              {{ folder.title }}
            </a>
            <button (click)="deleteFolder(folder.id)" matButton="outlined">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash-icon lucide-trash"
              >
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        }
      </div>

      <button matFab="elevated" (click)="openBottomSheet()" class="fab">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-plus-icon lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>
    </main>
  `,
})
export class ProtectedComponent {
  private _bottomSheet = inject(MatBottomSheet);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  readonly dialog = inject(MatDialog);

  constructor(
    public auth: SupabaseService,
    public data: supabaseRealtimeFolders
  ) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  async deleteFolder(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 'confirm') {
        await this.supabase.from('folders').delete().eq('id', id);
      }
    });
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
  imports: [
    MatListModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
})
export class BottomSheetNewFolder {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetNewFolder>>(MatBottomSheetRef);

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  profileForm = new FormGroup({
    newFolder: new FormControl('', Validators.required),
  });

  async onSubmit() {
    await this.supabase.from('folders').insert([
      { title: this.profileForm.value.newFolder },
    ]);
    this._bottomSheetRef.dismiss();
    this.profileForm.reset();
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}

/**
 * Neuer Confirm-Dialog
 */
@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  template: `
    <h2 mat-dialog-title>Ordner löschen?</h2>
    <mat-dialog-content>
      Bist du sicher, dass du diesen Ordner wirklich löschen möchtest?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="cancel">Abbrechen</button>
      <button mat-button color="warn" [mat-dialog-close]="'confirm'">
        Löschen
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
}
