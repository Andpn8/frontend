import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertionService {
  private rentUrl = 'http://localhost:3002/rents';
  private saleUrl = 'http://localhost:3002/sales';

  constructor(private http: HttpClient) {}

  getAllRentals(): Observable<any[]> {
    return this.http.get<any[]>(this.rentUrl);
  }

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(this.saleUrl);
  }

     createRent(insertionData: any): Observable<any> {
    const formattedData = {
      tipologia_immobile: insertionData.propertyType,
      titolo: insertionData.titolo,
      prezzo_mensile: insertionData.prezzo,
      comune: insertionData.citta,
      indirizzo: insertionData.indirizzo,
      civico: insertionData.numero,
      cap: insertionData.cap,
      superficie: insertionData.superficie,
      piano: insertionData.piano,
      classe_energetica: insertionData.classeEnergetica,
      locali: insertionData.locali,
      bagni: insertionData.bagni,
      servizi: insertionData.servizi || {
        portineria: false,
        sicurezza: false,
        garage: false,
        ascensore: false,
        climatizzazione: false,
        accesso_disabili: false
      },
      foto: insertionData.fotoPreviews || [],
      planimetrie: insertionData.planimetriaPreviews || [],
      email_agente: insertionData.email_agente,
      cellulare_agente: insertionData.cellulare_agente,
      cellulare_mostrato: insertionData.cellulare_mostrato,
      descrizione: insertionData.descrizione,
      agent_id: insertionData.agent_id
    };
    return this.http.post(this.rentUrl, formattedData);
  }

  createSale(insertionData: any): Observable<any> {
    const formattedData = {
      tipologia_immobile: insertionData.propertyType,
      titolo: insertionData.titolo,
      prezzo: insertionData.prezzo,
      comune: insertionData.citta,
      indirizzo: insertionData.indirizzo,
      civico: insertionData.numero,
      cap: insertionData.cap,
      superficie: insertionData.superficie,
      piano: insertionData.piano,
      classe_energetica: insertionData.classeEnergetica,
      locali: insertionData.locali,
      bagni: insertionData.bagni,
      servizi: insertionData.servizi || {
        portineria: false,
        sicurezza: false,
        garage: false,
        ascensore: false,
        climatizzazione: false,
        accesso_disabili: false
      },
      email_agente: insertionData.email_agente,
      cellulare_agente: insertionData.cellulare_agente,
      cellulare_mostrato: insertionData.cellulare_mostrato,
      descrizione: insertionData.descrizione,
      agent_id: insertionData.agent_id
    };
    return this.http.post(this.saleUrl, formattedData);
  }
}
