import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';



@Component({
  selector: 'app-funzione1',
  imports: [RouterLink,NgFor,FormsModule,MatCardModule],
  templateUrl: './funzione1.component.html',
  styleUrl: './funzione1.component.scss'
})

export class Funzione1Component{
  dataList: any[] = []; // array che conterrà i dati restituiti dal server
  private apiUrl = '/api/Viaggio1-controller';
  orarioDesiderato: string = ''; // Memorizza l'orario desiderato
  costoMassimo: number | null = null; // Memorizza il costo massimo
  costoMinimo: number | null = null; // Memorizza il costo massimo
  cittaPartenza: string = ''; //Memorizza la partenza
  cittaArrivo: string = ''; // Memorizza l'arrivo

  constructor(private router:Router, private http: HttpClient) {} // inietto il modulo httpclient per effettuare le chiamate http e router per navigare tra i moduli

  navigateToMap(item: any): void {
    // Naviga alla pagina map e passa i dati come stato
    this.router.navigate(['/map'], { state: { data: item } });
  }


  //per nostri servizi
  searchByPartenzaAndArrivo(partenza: string, arrivo: string) {
    this.http.get(`http://localhost:8080${this.apiUrl}/partenza-arrivo?partenza=${partenza}&arrivo=${arrivo}`)
      .subscribe(
        (response: any) => {
          // Successo: il server ha restituito una risposta valida
          this.dataList = response;
          console.log('Dati ricevuti:', this.dataList);
        },
        (error: any) => {
          // Errore: il server ha restituito un errore
          if (error.status === 404) {
            console.error('Errore 404: Risorsa non trovata.');
            alert('Nessun risultato trovato per la combinazione di partenza e arrivo.');
          } else {
            console.error('Errore durante la richiesta:', error);
            alert('Si è verificato un errore. Riprova più tardi.');
          }
        }
      );
  }

  findByCosto(min: number | null, max: number | null, partenza: string, arrivo: string) {
    this.http.get(`http://localhost:8080${this.apiUrl}/costo-partenza-arrivo?min=${min}&max=${max}&partenza=${partenza}&arrivo=${arrivo}`)
      .subscribe(
        (response: any) => {
          // Successo: il server ha restituito una risposta valida
          this.dataList = response;
          console.log('Dati ricevuti:', this.dataList);
        },
        (error: any) => {
          // Errore: il server ha restituito un errore
          if (error.status === 404) {
            console.error('Errore 404: Risorsa non trovata.');
            alert('Nessun risultato trovato per i parametri di costo inseriti.');
          } else {
            console.error('Errore durante la richiesta:', error);
            alert('Si è verificato un errore. Riprova più tardi.');
          }
        }
      );
  } 


  findByOrario(orario_min: string, partenza: string, arrivo: string) {
    this.http.get(`http://localhost:8080${this.apiUrl}/orario-partenza-arrivo?min=${orario_min}&partenza=${partenza}&arrivo=${arrivo}`)
      .subscribe(
        (response: any) => {
          // Successo: il server ha restituito una risposta valida
          this.dataList = response;
          console.log('Dati ricevuti:', this.dataList);
        },
        (error: any) => {
          // Errore: il server ha restituito un errore
          if (error.status === 404) {
            console.error('Errore 404: Risorsa non trovata.');
            alert('Nessun risultato trovato per i parametri di orario e destinazione.');
          } else {
            console.error('Errore durante la richiesta:', error);
            alert('Si è verificato un errore. Riprova più tardi.');
          }
        }
      );
  }

}
