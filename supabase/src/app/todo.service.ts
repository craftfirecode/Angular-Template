import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/supabase.service';

// const API_URL = 'http://localhost:4000';
const API_URL = 'https://auth.craftfire.de';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoList = signal<any[]>([]);
  private currentFolderId: number | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  async loadTodos(folderId: number) {
    try {
      // Nutze den sicheren GET-Endpunkt für einzelne Folders
      const folder: any = await this.http.get(`${API_URL}/folders/${folderId}`, { headers: this.getHeaders() }).toPromise();
      this.todoList.set(folder.todos || []);
      this.currentFolderId = folderId;
    } catch (e) {
      console.error('Fehler beim Laden der Todos:', e);
      this.todoList.set([]);
    }
  }

  async createTodo(data: any) {
    await this.http.post(`${API_URL}/todos`, data, { headers: this.getHeaders() }).toPromise();
    // Nach dem Erstellen aktualisierte Daten laden
    if (this.currentFolderId !== null) {
      await this.loadTodos(this.currentFolderId);
    }
  }

  async updateTodo(id: number, data: any) {
    await this.http.put(`${API_URL}/todos/${id}`, data, { headers: this.getHeaders() }).toPromise();
    // Nach dem Aktualisieren neue Daten laden
    if (this.currentFolderId !== null) {
      await this.loadTodos(this.currentFolderId);
    }
  }

  async deleteTodo(id: number) {
    await this.http.delete(`${API_URL}/todos/${id}`, { headers: this.getHeaders() }).toPromise();
    // Nach dem Löschen aktualisierte Daten laden
    if (this.currentFolderId !== null) {
      await this.loadTodos(this.currentFolderId);
    }
  }
}
