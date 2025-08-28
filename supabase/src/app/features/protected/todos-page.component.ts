import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupabaseService} from '../../core';
import {ActivatedRoute} from '@angular/router';
import {supabaseRealtimeTodos} from '../../supabaseRealtimeTodos';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <main>
      <h2>Todos Page</h2>
      <p *ngIf="auth.user()">Willkommen {{ auth.user()?.email }}</p>
      <p>Aktuelle ID: {{ id }}</p>

      <ul>
        @for (todos of filteredTodos(); track todos.id) {
          <li>
            <a [href]="'protected/todos/' + todos.id">{{ todos.id }} – {{ todos.title }}</a>
          </li>
        }
      </ul>

      <p>You have received a file called "cat-picture.jpeg".</p>

      <button matButton="elevated" (click)="openBottomSheet()">Open file</button>
    </main>
  `
})
export class TodosPageComponent {
  id: string | null = null;
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  // computed Signal für gefilterte Todos
  filteredTodos = computed(() => {
    if (!this.id) return [];
    return this.data.todoList().filter(todo => todo.folder_id == this.id);
  });

  constructor(
    public auth: SupabaseService,
    private route: ActivatedRoute,
    public data: supabaseRealtimeTodos
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
  imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
