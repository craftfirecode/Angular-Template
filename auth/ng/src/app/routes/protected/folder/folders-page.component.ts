import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FolderService} from '../../../signal/folder.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {InputText} from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {AnimateOnScroll} from 'primeng/animateonscroll';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule,BadgeModule, ConfirmDialogModule, RouterLink, ButtonModule, Drawer, ReactiveFormsModule, InputText, AnimateOnScroll],
  providers: [ConfirmationService],
  templateUrl: './folder.html',
  styleUrls: ['./folder.css']
})

export class FoldersPageComponent {
  folderService = inject(FolderService);
  confirmation = inject(ConfirmationService);
  fab = false;
  profileForm = new FormGroup({
    newFolder: new FormControl('', Validators.required),
  });

  async onSubmit() {
    await this.folderService.createFolder({ name: this.profileForm.value.newFolder });
    this.profileForm.reset();
  }

  log() {
    console.log(this.folderService.folderList());
  }

  async deleteFolder(id: number) {
    const options: any = {
      message: 'Bist du sicher, dass du diesen Ordner wirklich löschen möchtest?',
      header: 'Ordner löschen?',
      acceptLabel: 'Löschen',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger',
      rejectLabel: 'Abbrechen',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: async () => {
        await this.folderService.deleteFolder(id);
      }
    };

    this.confirmation.confirm(options);
  }
}
