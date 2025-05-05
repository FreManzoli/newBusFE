import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  nome: string = '';
  cognome: string = '';
  email: string = '';
  telefono: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // Nuova proprietà per il messaggio di successo

  constructor(private authService: AuthService, private router: Router) {}

  // Metodo per gestire la registrazione di un nuovo utente
  // Metodo per gestire la registrazione di un nuovo utente
  onRegister(): void {
    const nuovoUtente = {
      nome: this.nome,
      cognome: this.cognome,
      email: this.email,
      telefono: this.telefono,
      username: this.username,
      password: this.password,
    };
    this.authService.createUtente(nuovoUtente).subscribe({
      next: () => {
        this.successMessage = 'Registrazione avvenuta con successo!'; // Imposta il messaggio di successo
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
        setTimeout(() => {
          this.router.navigate(['/initial-page']); // Reindirizza alla pagina di login dopo 2 secondi
        }, 2000);
      },
      error: (error) => {
        this.successMessage = ''; // Resetta il messaggio di successo
        if (error.status === 409) {
          this.errorMessage = 'Email già registrata. Riprova.';
        } else {
          this.errorMessage = 'Errore durante la registrazione. Riprova.';
        }
      },
    });
  }

}
