import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  imports: [RouterLink,FormsModule, CommonModule, HttpClientModule,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  nome: string = '';
  cognome: string = '';
  email: string = '';
  telefono: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // Nuova proprietà per il messaggio di successo

  constructor(private authService: AuthService, private router: Router) {}

  


  // Metodo per gestire il login(non crea nuovo utente)
  onLogin(): void {
    this.authService.authenticateUtente(this.email, this.password).subscribe({
      next: (utente) => {
        // Salva il token o gestisci l'utente autenticato
        this.successMessage = 'Login avvenuto con successo!'; // Imposta il messaggio di successo
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
        setTimeout(() => {
          this.router.navigate(['/initial-page']); // Reindirizza alla pagina di login dopo 2 secondi
        }, 2000);
        //this.authService.saveToken(utente.token); // Se il backend restituisce un token
        //this.router.navigate(['/initial-page']); // Reindirizza alla pagina principale
      },
      error: () => {
        this.errorMessage = 'Credenziali non valide. Riprova.';
      },
    });
  }
}
