import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/Utente-controller/utenti'; // URL base del backend per gli utenti

  constructor(private http: HttpClient) {}

  // Metodo per registrare un nuovo utente
  createUtente(utente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, utente);
  }

  // Metodo per eliminare un utente
  deleteUtente(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${email}`);
  }

  // Metodo per autenticare un utente
  authenticateUtente(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  // Metodo per ottenere i dati di un utente tramite email
  getUtenteByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }

  // Metodo per salvare il token (se necessario)
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Metodo per ottenere il token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Metodo per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Metodo per effettuare il logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}