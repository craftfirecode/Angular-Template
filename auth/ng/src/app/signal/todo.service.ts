import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../core';
import {FolderService} from './folder.service';
import {environment} from '../environment';

const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class TodoService {
  todoList = signal<any[]>([]);
  loading = signal<boolean>(false);
  private currentFolderId: number | null = null;
  private requestToken = 0;
  private isInitialLoad = true; // Neuer Flag für ersten Ladevorgang

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private folderService: FolderService
  ) {
  }

  // Using cookie-based authentication (httpOnly cookies set by server).
  // HTTP requests must include credentials so cookies are sent.

  async loadTodos(folderId: number) {
    const token = ++this.requestToken;
    const isNewFolder = this.currentFolderId !== folderId;
    this.currentFolderId = folderId;

    // Nur bei Ordnerwechsel oder initialem Laden die Liste leeren
    if (isNewFolder || this.isInitialLoad) {
      this.loading.set(true);
      this.todoList.set([]);
      this.isInitialLoad = false;
    }

    try {
      const folder: any = await this.http.get(`${API_URL}/folders/${folderId}`, { withCredentials: true }).toPromise();
      if (token === this.requestToken) {
        this.todoList.set(folder.todos || []);
      }
    } catch (e) {
      console.error('Fehler beim Laden der Todos:', e);
      if (token === this.requestToken && isNewFolder) {
        this.todoList.set([]);
      }
    } finally {
      if (token === this.requestToken) {
        this.loading.set(false);
      }
    }
  }

  async refreshCurrentTodos() {
    if (this.currentFolderId !== null) {
      const folder: any = await this.http.get(
        `${API_URL}/folders/${this.currentFolderId}`,
        { withCredentials: true }
      ).toPromise();
      this.todoList.set(folder.todos || []);
    }
    try {
      const folders: any = await this.http.get(`${API_URL}/folders`, { withCredentials: true }).toPromise();
      this.folderService.folderList.set(folders);
    } catch (e) {
      this.folderService.folderList.set([]);
    }

  }

  async createTodo(data: any) {
    await this.http.post(`${API_URL}/todos`, data, { withCredentials: true }).toPromise();
    await this.refreshCurrentTodos();
  }

  async updateTodo(id: number, data: any) {
    await this.http.put(`${API_URL}/todos/${id}`, data, { withCredentials: true }).toPromise();
    await this.refreshCurrentTodos();
  }

  async deleteTodo(id: number) {
    await this.http.delete(`${API_URL}/todos/${id}`, { withCredentials: true }).toPromise();
    await this.refreshCurrentTodos();
  }
}
