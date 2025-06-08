import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OffertaVisitaVendita {
  offer_id?: number;
  email_offerente: string;
  data_visita: string;
  orario: string;
  inserzione_id: number;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class OffertaVisitaVenditaService {
  private apiUrl = 'http://localhost:3002/offerta-visita-vendita';

  constructor(private http: HttpClient) {}

  creaOffertaVisitaVendita(offerta: OffertaVisitaVendita): Observable<OffertaVisitaVendita> {
    return this.http.post<OffertaVisitaVendita>(this.apiUrl, offerta);
  }
}
