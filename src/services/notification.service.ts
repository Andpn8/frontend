import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Notifica {
  notificaId: number;
  titoloNotifica: string;
  contenuto: string;
  dataNotifica: string;
  letta: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3002/notifications'; // aggiorna se serve

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // o dove salvi il JWT
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getNotifiche(): Observable<Notifica[]> {
    return this.http.get<Notifica[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  markAsRead(id: number): Observable<Notifica> {
    return this.http.patch<Notifica>(`${this.apiUrl}/${id}/read`, {}, { headers: this.getAuthHeaders() });
  }

  deleteNotifica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
