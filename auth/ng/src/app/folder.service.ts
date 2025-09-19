import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/auth.service';

// const API_URL = 'http://localhost:4000';
const API_URL = 'https://auth.craftfire.de';

@Injectable({ providedIn: 'root' })
export class FolderService {
  folderList = signal<any[]>([]);
  folderID = signal<number | null>(null);

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.loadFolders();
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  async loadFolders() {
    try {
      const folders: any = await this.http.get(`${API_URL}/folders`, { headers: this.getHeaders() }).toPromise();
      this.folderList.set(folders);
    } catch (e) {
      this.folderList.set([]);
    }
  }

  async createFolder(data: any) {
    await this.http.post(`${API_URL}/folders`, data, { headers: this.getHeaders() }).toPromise();
    // Nach dem Erstellen aktualisierte Daten laden
    await this.loadFolders();
  }

  async updateFolder(id: number, data: any) {
    await this.http.put(`${API_URL}/folders/${id}`, data, { headers: this.getHeaders() }).toPromise();
    // Nach dem Aktualisieren neue Daten laden
    await this.loadFolders();
  }

  async deleteFolder(id: number) {
    await this.http.delete(`${API_URL}/folders/${id}`, { headers: this.getHeaders() }).toPromise();
    // Nach dem Löschen aktualisierte Liste laden
    await this.loadFolders();
  }

  setFolderID(id: number | null) {
    this.folderID.set(id);
  }
}
