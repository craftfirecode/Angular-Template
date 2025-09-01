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
        // When the folder ID changes we want to clear the current list
        // immediately to avoid briefly showing items from the previous folder.
        this.refreshTodoList(id, true);
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
            // For realtime events (inserts/updates/deletes) do NOT clear first
            // to avoid a visual blink when modifying the current list.
            this.refreshTodoList(currentFolder, false); // Aktualisiere die Liste bei Änderungen
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
  async refreshTodoList(folderId?: string | null, clearBeforeLoad: boolean = false) {
    const id = folderId ?? this.folderService.folderID();

    if (!id) {
      console.log('refreshTodoList called without folderId — aborting.');
      return;
    }

    // Optionally clear the currently shown todos before fetching.
    // We only want to do this on folder switches; realtime updates or
    // local add/delete should not clear to avoid a visible blink.
    if (clearBeforeLoad) {
      this.todoList.set([]);
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
