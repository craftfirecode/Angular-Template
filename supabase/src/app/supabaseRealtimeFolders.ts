import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from './core/supabase.config';

@Injectable({ providedIn: 'root' })

export class supabaseRealtimeFolders {
  private client: SupabaseClient;
  private channel: RealtimeChannel;

  // Signal hält die aktuelle Tabelle
  folderList = signal<any[]>([]);

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Initialdaten laden
    this.refreshFolderList();

    // Realtime-Channel aufsetzen
    this.channel = this.client.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folders' },
        (payload: any) => {
          console.log('Change received!', payload);
          this.refreshFolderList(); // Aktualisiere die Liste bei Änderungen
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
  async refreshFolderList() {
    const { data, error } = await this.client
      .from('folders') // Tabellenname korrigiert
      .select('*')
      .order('id', { ascending: true }); // oder nach created_at, je nach Tabelle

    if (error) {
      console.error('Fehler beim Laden der Folder:', error);
      return;
    }
    this.folderList.set(data ?? []);
  }

  // Channel aufräumen (optional bei AppDestroy)
  disconnect() {
    if (this.channel) {
      this.client.removeChannel(this.channel);
    }
  }
}
