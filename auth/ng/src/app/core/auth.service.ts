import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environment';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = signal<any | null>(null);
  private initPromise: Promise<void> | null = null;

  constructor(private http: HttpClient) {
    this.initPromise = this.init();
  }

  private async init() {
    // Try to get current user via cookie-based access token
    try {
      const res: any = await this.http.get(`${API_URL}/auth/me`, { withCredentials: true }).toPromise();
      this.user.set(res.user || null);
    } catch (e) {
      // try refresh
      try {
        await this.http.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true }).toPromise();
        const res2: any = await this.http.get(`${API_URL}/auth/me`, { withCredentials: true }).toPromise();
        this.user.set(res2.user || null);
      } catch (e2) {
        this.user.set(null);
      }
    }
  }

  async ready() {
    if (this.initPromise) await this.initPromise;
  }

  async signUp(email: string, username: string, password: string) {
    return this.http.post(`${API_URL}/auth/register`, { email, username, password }, { withCredentials: true }).toPromise();
  }

  async signIn(username: string, password: string) {
    // server sets httpOnly cookies for access and refresh
    const res: any = await this.http.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true }).toPromise();
    if (res?.user) this.user.set(res.user);
    return res;
  }

  async refresh() {
    try {
      await this.http.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true }).toPromise();
      const res: any = await this.http.get(`${API_URL}/auth/me`, { withCredentials: true }).toPromise();
      this.user.set(res.user || null);
      return true;
    } catch (e) {
      this.user.set(null);
      return false;
    }
  }

  async signOut() {
    this.user.set(null);
    try {
      await this.http.post(`${API_URL}/auth/logout`, {}, { withCredentials: true }).toPromise();
    } catch (e) {
      // ignore
    }
  }

  async logout() {
    await this.signOut();
  }

  isAuthenticated() {
    return !!this.user();
  }

  getUser() {
    return this.user();
  }
}
