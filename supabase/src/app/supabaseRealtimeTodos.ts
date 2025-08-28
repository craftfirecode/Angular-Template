import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from './core/supabase.config';

@Injectable({ providedIn: 'root' })

export class supabaseRealtimeTodos {
  private client: SupabaseClient;
  private channel: RealtimeChannel;

  // Signal hält die aktuelle Tabelle
  todoList = signal<any[]>([]);

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Initialdaten laden
    this.refreshTodoList();

    // Realtime-Channel aufsetzen
    this.channel = this.client.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        (payload: any) => {
          console.log('Change received!', payload);
          this.refreshTodoList(); // Aktualisiere die Liste bei Änderungen
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Realtime subscription established successfully.');
        } else {
          console.error('Failed to establish subscription:', status);
        }
      });
  }

  // Holt aktuelle Tabelle
  async refreshTodoList() {
    const { data, error } = await this.client
      .from('todos') // Tabellenname korrigiert
      .select('*')
      .order('id', { ascending: true }); // oder nach created_at, je nach Tabelle

    if (error) {
      console.error('Fehler beim Laden der Todos:', error);
      return;
    }
    this.todoList.set(data ?? []);
  }

  // Channel aufräumen (optional bei AppDestroy)
  disconnect() {
    if (this.channel) {
      this.client.removeChannel(this.channel);
    }
  }
}
