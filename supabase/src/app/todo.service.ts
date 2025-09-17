import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/supabase.service';

// const API_URL = 'http://localhost:4000';
const API_URL = 'https://auth.craftfire.de';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoList = signal<any[]>([]);
  loading = signal<boolean>(false); // Neu: Ladezustand
  private currentFolderId: number | null = null;
  private requestToken = 0; // Neu: verhindert veraltete Antworten

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
    const token = ++this.requestToken; // eindeutiger Token für diesen Aufruf
    this.currentFolderId = folderId; // zuerst setzen, damit spätere Updates wissen, welcher Ordner aktiv ist
    this.loading.set(true);
    this.todoList.set([]); // Alte Daten sofort entfernen, verhindert Flash
    try {
      const folder: any = await this.http.get(`${API_URL}/folders/${folderId}`, { headers: this.getHeaders() }).toPromise();
      // Nur anwenden, wenn dies noch der aktuellste Request ist
      if (token === this.requestToken) {
        this.todoList.set(folder.todos || []);
      }
    } catch (e) {
      console.error('Fehler beim Laden der Todos:', e);
      if (token === this.requestToken) {
        this.todoList.set([]);
      }
    } finally {
      if (token === this.requestToken) {
        this.loading.set(false);
      }
    }
  }

  async createTodo(data: any) {
    await this.http.post(`${API_URL}/todos`, data, { headers: this.getHeaders() }).toPromise();
    if (this.currentFolderId !== null) {
      await this.loadTodos(this.currentFolderId);
    }
  }

  async updateTodo(id: number, data: any) {
    await this.http.put(`${API_URL}/todos/${id}`, data, { headers: this.getHeaders() }).toPromise();
    if (this.currentFolderId !== null) {
      await this.loadTodos(this.currentFolderId);
    }
  }

  async deleteTodo(id: number) {
    await this.http.delete(`${API_URL}/todos/${id}`, { headers: this.getHeaders() }).toPromise();
    if (this.currentFolderId !== null) {
      await this.loadTodos(this.currentFolderId);
    }
  }
}
