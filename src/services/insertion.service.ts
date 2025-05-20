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
}
