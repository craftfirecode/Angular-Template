import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('supabase');
  public readonly ready = signal(false);
  public readonly auth = inject(SupabaseService);

  constructor() {
    // wait for session to be loaded before rendering routes
    this.auth.ready().then(() => this.ready.set(true));
  }
}
