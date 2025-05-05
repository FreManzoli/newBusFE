import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/carrello'; // URL dell'API per il carrello

  constructor(private http: HttpClient) {}

  // Aggiungi un viaggio al carrello
  addViaggioToCarrello(idUtente: string, idViaggio: string, quantita: number): Observable<any> {
    const params = new HttpParams()
      .set('idUtente', idUtente)
      .set('idViaggio', idViaggio)
      .set('quantita', quantita.toString());
    return this.http.post(`${this.apiUrl}/aggiungi`, null, { params });
  }

  // Ottieni tutti i viaggi nel carrello di un utente
  getCarrelloByUtente(idUtente: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idUtente}`);
  }

  // Rimuovi un viaggio dal carrello
  removeViaggioFromCarrello(idUtente: string, idViaggio: string): Observable<void> {
    const params = new HttpParams()
      .set('idUtente', idUtente)
      .set('idViaggio', idViaggio);
    return this.http.delete<void>(`${this.apiUrl}/rimuovi`, { params });
  }

  // Calcola il totale del carrello
  calcolaTotaleCarrello(idUtente: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totale/${idUtente}`);
  }

  
}