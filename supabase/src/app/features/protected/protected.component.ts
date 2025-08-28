import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupabaseService} from '../../core';
import {supabaseRealtimeFolders} from '../../supabaseRealtimeFolders';
import {MatButton} from '@angular/material/button';
import {LucideAngularModule, FileIcon} from 'lucide-angular';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule, MatButton, LucideAngularModule],
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
            <button matButton="outlined">
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
    </main>
  `
})
export class ProtectedComponent {
  constructor(public auth: SupabaseService, public data: supabaseRealtimeFolders) {
  }

  readonly FileIcon = FileIcon;

  logout() {
    this.auth.signOut();
  }
}
