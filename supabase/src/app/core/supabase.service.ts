import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable, signal } from '@angular/core';
import {SUPABASE_ANON_KEY, SUPABASE_URL} from './supabase.config';

const URL = SUPABASE_URL;
const KEY = SUPABASE_ANON_KEY;

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient;
  public user = signal<any | null>(null);
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.client = createClient(URL, KEY);
    // start initialization and keep a promise so other callers can wait
    this.initPromise = this.init();
    this.client.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  private async init() {
    try {
      const { data } = await this.client.auth.getUser();
      this.user.set(data.user ?? null);
    } catch (e) {
      this.user.set(null);
    }
  }

  // allow callers (e.g. guards) to wait for initial session load
  async ready() {
    if (this.initPromise) await this.initPromise;
  }

  async signUp(email: string, password: string) {
    const res = await this.client.auth.signUp({ email, password });
    return res;
  }

  async signIn(email: string, password: string) {
    const res = await this.client.auth.signInWithPassword({ email, password });
    return res;
  }

  async signOut() {
    await this.client.auth.signOut();
    this.user.set(null);
  }

  isAuthenticated() {
    return !!this.user();
  }

  async ensureAuthenticated() {
    await this.ready();
    return this.isAuthenticated();
  }
}
