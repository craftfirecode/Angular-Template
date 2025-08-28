import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Ordner löschen?</h2>
    <mat-dialog-content>
      Bist du sicher, dass du diesen Ordner wirklich löschen möchtest?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="cancel">Abbrechen</button>
      <button mat-button color="warn" [mat-dialog-close]="'confirm'">Löschen</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteDialog>);
}
