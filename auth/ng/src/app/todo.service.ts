import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './core/auth.service';
import {FolderService} from './folder.service';

// const API_URL = 'http://localhost:4000';
const API_URL = 'https://auth.craftfire.de';

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

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

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
      const folder: any = await this.http.get(`${API_URL}/folders/${folderId}`, {headers: this.getHeaders()}).toPromise();
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
        {headers: this.getHeaders()}
      ).toPromise();
      this.todoList.set(folder.todos || []);
    }
    try {
      const folders: any = await this.http.get(`${API_URL}/folders`, {headers: this.getHeaders()}).toPromise();
      this.folderService.folderList.set(folders);
    } catch (e) {
      this.folderService.folderList.set([]);
    }

  }

  async createTodo(data: any) {
    await this.http.post(`${API_URL}/todos`, data, {headers: this.getHeaders()}).toPromise();
    await this.refreshCurrentTodos();
  }

  async updateTodo(id: number, data: any) {
    await this.http.put(`${API_URL}/todos/${id}`, data, {headers: this.getHeaders()}).toPromise();
    await this.refreshCurrentTodos();
  }

  async deleteTodo(id: number) {
    await this.http.delete(`${API_URL}/todos/${id}`, {headers: this.getHeaders()}).toPromise();
    await this.refreshCurrentTodos();
  }
}
