import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SUPABASE_ANON_KEY, SUPABASE_URL, SupabaseService} from '../../../core';
import {supabaseRealtimeFolders} from '../../../supabaseRealtimeFolders';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';
import {RouterLink} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {Drawer} from 'primeng/drawer';
import {InputText} from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {AnimateOnScroll} from 'primeng/animateonscroll';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule, RouterLink, ButtonModule, Drawer, ReactiveFormsModule, InputText, AnimateOnScroll],
  providers: [ConfirmationService],
  templateUrl: './folder.html',
  styleUrls: ['./folder.css']
})
export class ProtectedComponent {
  auth = inject(SupabaseService);
  data = inject(supabaseRealtimeFolders);
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  confirmation = inject(ConfirmationService);
  fab = false;
  profileForm = new FormGroup({
    newFolder: new FormControl('', Validators.required),
  });

  async onSubmit() {
    await this.supabase.from('folders').insert([{title: this.profileForm.value.newFolder}]);
    this.profileForm.reset();
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
        await this.supabase.from('folders').delete().eq('id', id);
      }
    };

    this.confirmation.confirm(options);
  }

  logout() {
    this.auth.signOut();
  }
}
