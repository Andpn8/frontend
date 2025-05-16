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
  private apiUrlAgent = 'http://localhost:3002/agent';
  private apiUrlAmministrator = 'http://localhost:3002/amministrator';

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
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('token', token);
  } else {
    console.warn('localStorage non disponibile');
  }
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

  getUserRoleFromToken(): 'user' | 'agent' | 'ceo' | 'admin' | 'guest' {
    const token = this.getToken();
    if (!token) return 'guest';
  
    try {
      const decoded: any = jwtDecode(token);
  
      if (decoded.amministratore_id) return 'admin';
      if (decoded.agencyId) return 'ceo';
      if (decoded.agentId) return 'agent';
      return 'user';
    } catch (e) {
      return 'guest';
    }
  }

  loginAgent(agentId: number, password: string): Observable<any> {
    return this.http.post(`${this.apiUrlAgent}/login`, { agentId, password });
  }

  loginAmministrator(amministratore_id: number, password: string): Observable<any> {
    return this.http.post(`${this.apiUrlAmministrator}/login`, { amministratore_id, password });
  }

  createAdmin(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3002/amministrator', data, { headers });
  }

  getUserId(): number | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.user_id || null;
  } catch (e) {
    return null;
  }
}
}
