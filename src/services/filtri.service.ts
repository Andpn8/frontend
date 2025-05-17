import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FilterSet } from '../models/filter-set.model';

@Injectable({ providedIn: 'root' })
export class FiltriService {
  private apiUrl = 'http://localhost:3002/filters';

  constructor(private http: HttpClient) {}

  salvaFiltri(user_id: string, filters: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/save`, { user_id, ...filters });
}

 getFiltri(userId: string): Observable<FilterSet[]> {
  return this.http.get<any[]>(`${this.apiUrl}/${userId}`).pipe(
    map(raw => raw.map(entry => ({
      id: entry.id_filtro,
      location: entry.localita,
      minPrice: entry.prezzo_minimo,
      maxPrice: entry.prezzo_massimo,
      rooms: entry.numero_camere,
      bathrooms: entry.numero_bagni,
      minSurface: entry.superfice_minima,
      maxSurface: entry.superfice_massima,
      energyClass: entry.classe_energetica,
      services: {
        portineria: entry.servizi?.includes('portineria') || false,
        garage: entry.servizi?.includes('garage') || false,
        climatizzazione: entry.servizi?.includes('climatizzazione') || false,
        sicurezza: entry.servizi?.includes('sicurezza') || false,
        ascensore: entry.servizi?.includes('ascensore') || false,
        accessoDisabili: entry.servizi?.includes('accessoDisabili') || false,
      }
    })))
  );
}

deleteFiltro(filtroId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${filtroId}`);
}
}
