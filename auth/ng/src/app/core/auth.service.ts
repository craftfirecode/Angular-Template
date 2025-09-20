import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environment';

const API_URL = environment.apiUrl;
const TOKEN_KEY = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = signal<any | null>(null);
  private initPromise: Promise<void> | null = null;

  constructor(private http: HttpClient) {
    this.initPromise = this.init();
  }

  private async init() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      this.user.set(null);
      return;
    }
    // Versuche, User-Daten zu laden (z.B. /folders als Ping)
    try {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      await this.http.get(`${API_URL}/folders`, { headers }).toPromise();
      // User ist eingeloggt, aber wir haben keine Userdaten → nur Token merken
      this.user.set({ token });
    } catch {
      this.user.set(null);
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  async ready() {
    if (this.initPromise) await this.initPromise;
  }

  async signUp(email: string, username: string, password: string) {
    return this.http.post(`${API_URL}/auth/register`, { email, username, password }).toPromise();
  }

  async signIn(username: string, password: string) {
    const res: any = await this.http.post(`${API_URL}/auth/login`, { username, password }).toPromise();
    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      this.user.set({ token: res.token });
    }
    return res;
  }

  async signOut() {
    localStorage.removeItem(TOKEN_KEY);
    this.user.set(null);
  }

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
}
