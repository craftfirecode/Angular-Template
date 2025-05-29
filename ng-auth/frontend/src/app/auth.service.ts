// src/app/auth.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(
      `${this.baseUrl}/login`,
      {email, password}
    );
  }

  register(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, {email, password});
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
