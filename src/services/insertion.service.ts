import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertionService {
  private rentUrl = 'http://localhost:3002/rents';
  private saleUrl = 'http://localhost:3002/sales';
  private uploadUrl = 'http://localhost:3002/foto/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{url: string}>(this.uploadUrl, formData);
  }

  // Metodo per caricare più file
  uploadFiles(files: File[]): Observable<string[]> {
    if (!files || files.length === 0) {
      return of([]);
    }
    
    const uploadObservables = files.map(file => 
      this.uploadFile(file).pipe(
        map(response => response.url),
        catchError(error => {
          console.error('Upload error:', error);
          return of(null);
        })
      )
    );

    return forkJoin(uploadObservables).pipe(
      map(urls => urls.filter(url => url !== null) as string[])
    );
  }


  getAllRentals(): Observable<any[]> {
    return this.http.get<any[]>(this.rentUrl);
  }

  getAllSales(): Observable<any[]> {
    return this.http.get<any[]>(this.saleUrl);
  }

     createRent(insertionData: any, fotoUrls: string[] = [], planimetrieUrls: string[] = []): Observable<any> {
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
      email_agente: insertionData.email_agente,
      cellulare_agente: insertionData.cellulare_agente,
      cellulare_mostrato: insertionData.cellulare_mostrato,
      descrizione: insertionData.descrizione,
      agent_id: insertionData.agent_id,
      foto: fotoUrls,
      planimetrie: planimetrieUrls,
    };
    return this.http.post(this.rentUrl, formattedData);
  }

  createSale(insertionData: any, fotoUrls: string[] = [], planimetrieUrls: string[] = []): Observable<any> {
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
      agent_id: insertionData.agent_id,
      foto: fotoUrls,
      planimetrie: planimetrieUrls,
    };
    return this.http.post(this.saleUrl, formattedData);
  }
}
