import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // Nuova proprietà per il messaggio di successo

  constructor(private authService: AuthService, private router: Router) {}

  // Metodo per gestire il login (non crea nuovo utente)
  onLogin(): void {
    this.authService.authenticateUtente(this.email, this.password).subscribe({
      next: (response) => {
        // Salva il token JWT restituito dal backend in 
        this.authService.saveToken(response.token);

        // Imposta il messaggio di successo
        this.successMessage = 'Login avvenuto con successo!';
        this.errorMessage = ''; // Resetta eventuali messaggi di errore

        // Reindirizza alla pagina iniziale dopo 2 secondi
        setTimeout(() => {
          this.router.navigate(['/initial-page']);
        }, 2000);
      },
      error: () => {
        // Mostra un messaggio di errore in caso di credenziali non valide
        this.errorMessage = 'Credenziali non valide. Riprova.';
        this.successMessage = ''; // Resetta il messaggio di successo
      },
    });
  }
}
