import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterSet } from '../models/filter-set.model';

@Injectable({ providedIn: 'root' })
export class FiltriService {
  private apiUrl = 'http://localhost:3002/filters';

  constructor(private http: HttpClient) {}

 salvaFiltri(user_id: string, filters: FilterSet): Observable<any> {
  return this.http.post(`${this.apiUrl}/save`, { user_id, ...filters });
}

  getFiltri(userId: string): Observable<FilterSet[]> {
    return this.http.get<FilterSet[]>(`${this.apiUrl}/${userId}`);
  }
}
