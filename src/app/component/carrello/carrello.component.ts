import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carrello',
  imports: [RouterLink, MatCardModule,CommonModule,FormsModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent implements OnInit {
  carrello: any[] = []; // Lista dei viaggi nel carrello
  totale: number = 0; // Totale del carrello
  idUtente: string = '5c10ff5b-25fc-4846-a308-f5d22501f2eb'; // ID utente statico (sostituisci con quello reale)
  mostraPagamento: boolean = false; // Stato per mostrare/nascondere la modale
  datiPagamento = {
    nome: '',
    numeroCarta: '',
    scadenza: '',
    cvv: ''
  };
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.caricaCarrello();
    this.calcolaTotale();
  }

  // Carica i viaggi nel carrello
  caricaCarrello(): void {
    this.cartService.getCarrelloByUtente(this.idUtente).subscribe({
      next: (data) => {
        this.carrello = data;
        console.log('Carrello caricato:', this.carrello);
      },
      error: (err) => {
        console.error('Errore durante il caricamento del carrello:', err);
      }
    });
  }

  // Rimuovi un viaggio dal carrello
  rimuoviViaggio(idViaggio: string): void {
    this.cartService.removeViaggioFromCarrello(this.idUtente, idViaggio).subscribe({
      next: () => {
        this.caricaCarrello(); // Ricarica il carrello dopo la rimozione
        this.calcolaTotale(); // Ricalcola il totale
      },
      error: (err) => {
        console.error('Errore durante la rimozione del viaggio:', err);
      }
    });
  }

  // Calcola il totale del carrello
  calcolaTotale(): void {
    this.cartService.calcolaTotaleCarrello(this.idUtente).subscribe({
      next: (totale) => {
        this.totale = totale;
      },
      error: (err) => {
        console.error('Errore durante il calcolo del totale:', err);
      }
    });
  }

  //pagamento
  apriPagamento(): void {
    this.mostraPagamento = true;
  }

  chiudiPagamento(): void {
    this.mostraPagamento = false;
  }

  confermaPagamento(): void {
    if (this.datiPagamento.nome && this.datiPagamento.numeroCarta && this.datiPagamento.scadenza && this.datiPagamento.cvv) {
      alert('Pagamento effettuato con successo!');
      this.mostraPagamento = false;
      // Puoi aggiungere qui la logica per svuotare il carrello o inviare i dati al backend
    } else {
      alert('Compila tutti i campi per effettuare il pagamento.');
    }
  }
}
