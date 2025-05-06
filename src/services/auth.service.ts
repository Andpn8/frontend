import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlUser = 'http://localhost:3002/users';
  private apiUrlAgency = 'http://localhost:3002/agency';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlUser}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlUser}/`, { name, email, password });
  }

  loginAgency(piva: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAgency}/login`, { piva, password });
  }

  registerAgency(data: any) {
    return this.http.post(`${this.apiUrlAgency}/register`, data);
  }

  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrlUser}/me`, { headers });
  }

  createAgent(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3002/agent', data, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserRoleFromToken(): 'user' | 'agent' | 'ceo' | 'guest' {
    const token = this.getToken();
    if (!token) return 'guest';
  
    try {
      const decoded: any = jwtDecode(token);
      
      if (decoded.agencyId) return 'ceo';
      if (decoded.agentId) return 'agent';
      return 'user'; // fallback se è un utente normale
    } catch (e) {
      return 'guest';
    }
  }

  createAdmin(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3002/amministratori', data, { headers });
  }
}
