import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/supabase.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('Todo App');
  public readonly ready = signal(false);
  public readonly auth = inject(AuthService);

  constructor() {
    // wait for session to be loaded before rendering routes
    this.auth.ready().then(() => this.ready.set(true));
  }
}
