import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OffertaVisitaAffitto {
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
export class OffertaVisitaAffittoService {
  private apiUrl = 'http://localhost:3002/offerta-visita-affitto';

  constructor(private http: HttpClient) {}

  creaOffertaVisitaAffitto(offerta: OffertaVisitaAffitto): Observable<OffertaVisitaAffitto> {
    return this.http.post<OffertaVisitaAffitto>(this.apiUrl, offerta);
  }
}
