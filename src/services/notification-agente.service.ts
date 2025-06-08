import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NotificaAgente {
  notificaId: number;
  titoloNotifica: string;
  contenuto: string;
  dataNotifica: string;
  letta: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationAgenteService {
  private apiUrl = 'http://localhost:3002/notifications-agent'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getNotifiche(): Observable<NotificaAgente[]> {
    return this.http.get<NotificaAgente[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  markAsRead(id: number): Observable<NotificaAgente> {
    return this.http.patch<NotificaAgente>(`${this.apiUrl}/${id}/read`, {}, { headers: this.getAuthHeaders() });
  }

  deleteNotifica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
