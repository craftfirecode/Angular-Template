import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from './core';
import { FolderService } from './folder.service';

@Injectable({ providedIn: 'root' })

export class supabaseRealtimeTodos {
  private client: SupabaseClient;
  private channel: RealtimeChannel;
  private folderService = inject(FolderService);

  // Signal hält die aktuelle Tabelle
  todoList = signal<any[]>([]);
  signalFolderID = this.folderService.folderID; // Ensure `signalFolderID` is properly defined and accessible.

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Wait for a folder ID and load initial data when it's available
    effect(() => {
      const id = this.folderService.folderID();
      if (id) {
        this.refreshTodoList(id);
      }
    });

    // Realtime-Channel aufsetzen
    this.channel = this.client.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        (payload: any) => {
          console.log('Change received!', payload);
          const currentFolder = this.folderService.folderID();
          if (currentFolder) {
            this.refreshTodoList(currentFolder); // Aktualisiere die Liste bei Änderungen
          } else {
            console.log('No folder selected; skipping refresh on realtime event.');
          }
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
  async refreshTodoList(folderId?: string | null) {
    const id = folderId ?? this.folderService.folderID();

    if (!id) {
      console.log('refreshTodoList called without folderId — aborting.');
      return;
    }

    const { data, error } = await this.client
      .from('todos')
      .select('*')
      .eq('folder_id', id)
      .order('id', { ascending: true });

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
