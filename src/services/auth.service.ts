import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3002/users'; // L'URL del tuo backend

  constructor(private http: HttpClient) {}

  // Funzione per il login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Funzione per la registrazione
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, { name, email, password });
  }

  // Funzione per ottenere il profilo utente
  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }
}