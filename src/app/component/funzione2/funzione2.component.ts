import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-funzione2',
  imports: [RouterLink,NgFor,FormsModule, MatCardModule],
  templateUrl: './funzione2.component.html',
  styleUrl: './funzione2.component.scss'
})
export class Funzione2Component {
  dataList: any[] = []; // array che conterrà i dati restituiti dal server
  private apiUrl = '/api/Viaggio1-controller';
  orarioDesiderato: string = ''; // Memorizza l'orario desiderato
  costoMassimo: number | null = null; // Memorizza il costo massimo
  costoMinimo: number | null = null; // Memorizza il costo massimo
  cittaPartenza: string = ''; //Memorizza la partenza
  

  constructor(private http: HttpClient) {} // inietto il modulo httpclient per effettuare le chiamate http



  searchByPartenza(partenza: string){
    this.http.get(`http://localhost:8080${this.apiUrl}/partenza?partenza=${partenza}`).subscribe(
      (response: any)=>{
        this.dataList = response;
        console.log(this.dataList);
      },
      (error: any) => {
        // Errore: il server ha restituito un errore
        if (error.status === 404) {
          console.error('Errore 404: Risorsa non trovata.');
          alert('Nessun risultato trovato per la partenza inserita.');
        } else {
          console.error('Errore durante la richiesta:', error);
          alert('Si è verificato un errore. Riprova più tardi.');
        }
      }
    );
  }

  findByCosto1(min: number| null, max: number| null,partenza: string) {
      return this.http.get(`http://localhost:8080${this.apiUrl}/costo-partenza?min=${min}&max=${max}&partenza=${partenza}`).subscribe(
        (response: any)=>{
        this.dataList = response;
        console.log(this.dataList);
        },
        (error: any) => {
          // Errore: il server ha restituito un errore
          if (error.status === 404) {
            console.error('Errore 404: Risorsa non trovata.');
            alert('Nessun risultato trovato per il costo inserito.');
          } else {
            console.error('Errore durante la richiesta:', error);
            alert('Si è verificato un errore. Riprova più tardi.');
          }
        }
      ); 
    } 


  findByOrario1(orario_min:string,partenza: string){
      return this.http.get(`http://localhost:8080${this.apiUrl}/orario-partenza?min=${orario_min}&partenza=${partenza}`).subscribe(
        (response: any)=>{
        this.dataList = response;
        console.log(this.dataList);
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
