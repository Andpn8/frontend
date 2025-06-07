import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OffertaAffitto {
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
export class OffertaAffittoService {
  private apiUrl = 'http://localhost:3002/offerta-affitto';

  constructor(private http: HttpClient) {}

  creaOffertaAffitto(offerta: OffertaAffitto): Observable<OffertaAffitto> {
    return this.http.post<OffertaAffitto>(this.apiUrl, offerta);
  }
}
