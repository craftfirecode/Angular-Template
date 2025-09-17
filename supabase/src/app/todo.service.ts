import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/supabase.service';
import { BackendRealtimeService } from './core/backend-realtime.service';

const API_URL = 'http://localhost:4000';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoList = signal<any[]>([]);

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private realtime: BackendRealtimeService
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  async loadTodos(folderId: number) {
    try {
      // Annahme: Backend liefert alle Todos zu einem Folder
      const todos: any = await this.http.get(`${API_URL}/folders/${folderId}`, { headers: this.getHeaders() }).toPromise();
      this.todoList.set(todos.todos || []);
    } catch (e) {
      this.todoList.set([]);
    }
  }

  listenRealtime(folderId: number) {
    this.realtime.on('todo:created', (todo) => {
      if (todo.folderId === folderId) this.loadTodos(folderId);
    });
    this.realtime.on('todo:updated', (todo) => {
      if (todo.folderId === folderId) this.loadTodos(folderId);
    });
    this.realtime.on('todo:deleted', (id) => {
      this.loadTodos(folderId);
    });
  }

  async createTodo(data: any) {
    await this.http.post(`${API_URL}/todos`, data, { headers: this.getHeaders() }).toPromise();
  }

  async updateTodo(id: number, data: any) {
    await this.http.put(`${API_URL}/todos/${id}`, data, { headers: this.getHeaders() }).toPromise();
  }

  async deleteTodo(id: number) {
    await this.http.delete(`${API_URL}/todos/${id}`, { headers: this.getHeaders() }).toPromise();
  }
}

