import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/carrello'; // URL dell'API per il carrello

  constructor(private http: HttpClient) {}

  // Metodo per ottenere l'intestazione con il token JWT
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // Recupera il token JWT da sessionStorage
    if (!token) {
      throw new Error('Token non trovato. Effettua il login.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Aggiungi un viaggio al carrello
  addViaggioToCarrello(idViaggio: string, quantita: number): Observable<any> {
    const headers = this.getAuthHeaders(); // Ottieni le intestazioni con il token
    console.log('Intestazioni inviate:', headers); // Log delle intestazioni
    const params = new HttpParams()
      .set('idViaggio', idViaggio)
      .set('quantita', quantita.toString());
    return this.http.post(`${this.apiUrl}/aggiungi`, null, { params, headers });
}

  // Ottieni tutti i viaggi nel carrello dell'utente autenticato
  getCarrelloByUtente(): Observable<any[]> {
    const headers = this.getAuthHeaders(); // Ottieni le intestazioni con il token
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  // Rimuovi un viaggio dal carrello
  removeViaggioFromCarrello(idViaggio: string): Observable<void> {
    const headers = this.getAuthHeaders(); // Ottieni le intestazioni con il token
    const params = new HttpParams().set('idViaggio', idViaggio);
    return this.http.delete<void>(`${this.apiUrl}/rimuovi`, { params, headers });
  }

  // Calcola il totale del carrello
  calcolaTotaleCarrello(): Observable<number> {
    const headers = this.getAuthHeaders(); // Ottieni le intestazioni con il token
    return this.http.get<number>(`${this.apiUrl}/totale`, { headers });
  }

  // Svuota il carrello dell'utente autenticato
  svuotaCarrello(): Observable<void> {
    const headers = this.getAuthHeaders(); // Ottieni le intestazioni con il token
    return this.http.delete<void>(`${this.apiUrl}/svuota`, { headers });
  }
}