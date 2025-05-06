import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrello',
  imports: [RouterLink, MatCardModule, CommonModule, FormsModule],
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit, OnDestroy {
  carrello: any[] = []; // Lista dei viaggi nel carrello
  totale: number = 0; // Totale del carrello
  mostraPagamento: boolean = false; // Stato per mostrare/nascondere la modale
  datiPagamento = {
    nome: '',
    numeroCarta: '',
    scadenza: '',
    cvv: ''
  };
  messaggioPagamento: string = ''; // Messaggio da mostrare dopo il pagamento

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.caricaCarrello();
    this.calcolaTotale();

    // Aggiungi un listener per l'evento beforeunload
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  ngOnDestroy(): void {
    // Rimuovi il listener per evitare memory leaks
    window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  handleBeforeUnload(event: Event): void {
    // Svuota il carrello quando l'utente chiude il browser o la scheda
    this.cartService.svuotaCarrello().subscribe({
      next: () => {
        console.log('Carrello svuotato con successo prima della chiusura del browser.');
      },
      error: (err) => {
        console.error('Errore durante lo svuotamento del carrello:', err);
      }
    });
  }

  // Carica i viaggi nel carrello
  caricaCarrello(): void {
    this.cartService.getCarrelloByUtente().subscribe({
      next: (data) => {
        this.carrello = data;
        console.log('Carrello caricato:', this.carrello);
      },
      error: (err) => {
        console.error('Errore durante il caricamento del carrello:', err);
        alert('Errore durante il caricamento del carrello. Effettua il login.');
      }
    });
  }

  // Rimuovi un viaggio dal carrello
  rimuoviViaggio(idViaggio: string): void {
    this.cartService.removeViaggioFromCarrello(idViaggio).subscribe({
      next: () => {
        this.caricaCarrello(); // Ricarica il carrello dopo la rimozione
        this.calcolaTotale(); // Ricalcola il totale
      },
      error: (err) => {
        console.error('Errore durante la rimozione del viaggio:', err);
        alert('Errore durante la rimozione del viaggio. Riprova.');
      }
    });
  }

  // Calcola il totale del carrello
  calcolaTotale(): void {
    this.cartService.calcolaTotaleCarrello().subscribe({
      next: (totale) => {
        this.totale = totale;
      },
      error: (err) => {
        console.error('Errore durante il calcolo del totale:', err);
        alert('Errore durante il calcolo del totale. Riprova.');
      }
    });
  }

  // Pagamento
  apriPagamento(): void {
    this.mostraPagamento = true;
  }

  chiudiPagamento(): void {
    this.mostraPagamento = false;
  }

  confermaPagamento(): void {
    if (this.datiPagamento.nome && this.datiPagamento.numeroCarta && this.datiPagamento.scadenza && this.datiPagamento.cvv) {
      // Mostra un messaggio di successo
      alert('Pagamento effettuato con successo!');

      // Svuota il carrello nel backend
      this.cartService.svuotaCarrello().subscribe({
        next: () => {
          // Aggiorna il carrello e mostra il messaggio di successo
          this.caricaCarrello();
          this.totale = 0; // Resetta il totale
          this.mostraPagamento = false; // Chiude la modale
          this.messaggioPagamento = 'PAGAMENTO EFFETTUATO CON SUCCESSO'; // Imposta il messaggio
        },
        error: (err) => {
          console.error('Errore durante lo svuotamento del carrello:', err);
          alert('Errore durante il pagamento. Riprova.');
        }
      });
    } else {
      alert('Compila tutti i campi per effettuare il pagamento.');
    }
  }

  Logout(): void {
    sessionStorage.removeItem('authToken'); // Rimuove il token JWT da sessionStorage
    alert('Sei stato disconnesso.');
  }

  decodeUUIDToString(uuid: string): string {
    // Prendi solo la parte significativa dell'UUID (senza i trattini)
    const hexString = uuid.replace(/-/g, '');
  
    // Converte ogni coppia di caratteri esadecimali in un carattere ASCII
    let result = '';
    for (let i = 0; i < hexString.length; i += 2) {
      const hexPair = hexString.substring(i, i + 2);
      const charCode = parseInt(hexPair, 16);
      if (charCode !== 0) { // Ignora i caratteri nulli (0x00)
        result += String.fromCharCode(charCode);
      }
    }
    return result;
  }
}
