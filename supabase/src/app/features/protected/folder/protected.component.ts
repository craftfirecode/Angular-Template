import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService} from '../../../core';
import {supabaseRealtimeFolders} from '../../../supabaseRealtimeFolders';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, MatButton, MatFabButton, RouterLink],
  templateUrl: './folder.html',
})
export class ProtectedComponent {
  private _bottomSheet = inject(MatBottomSheet);
  auth = inject(SupabaseService);
  data = inject(supabaseRealtimeFolders);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  readonly dialog = inject(MatDialog);

  async deleteFolder(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {width: '300px'});
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
  imports: [MatButton, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
})
export class BottomSheetNewFolder {
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetNewFolder>>(MatBottomSheetRef);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  profileForm = new FormGroup({
    newFolder: new FormControl('', Validators.required),
  });

  async onSubmit() {
    await this.supabase.from('folders').insert([{title: this.profileForm.value.newFolder}]);
    this._bottomSheetRef.dismiss();
    this.profileForm.reset();
  }
}

@Component({
  selector: 'app-confirm-delete-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
}
