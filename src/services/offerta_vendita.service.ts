import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OffertaVendita {
  offer_id?: number;
  email_offerente: string;
  offer_amount: number;
  inserzione_id: number;
  user_id: number;
  offer_date?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class OffertaVenditaService {
  private apiUrl = 'http://localhost:3002/offerta-vendita';

  constructor(private http: HttpClient) {}

  creaOffertaVendita(offerta: OffertaVendita): Observable<OffertaVendita> {
    return this.http.post<OffertaVendita>(this.apiUrl, offerta);
  }
}
