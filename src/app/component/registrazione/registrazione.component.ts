import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  imports: [RouterLink,NgIf],
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss'
})
export class RegistrazioneComponent {
  autenticazioneEffettuata: boolean = false;

  ngOnInit(): void {
    // Controlla se il token è presente in sessionStorage
    const token = sessionStorage.getItem('authToken');
    this.autenticazioneEffettuata = !!token; // Imposta a true se il token esiste
    console.log('Autenticazione Effettuata:', this.autenticazioneEffettuata);
}
  Logout(): void {
    sessionStorage.removeItem('authToken'); // Rimuove il token da sessionStorage
    this.autenticazioneEffettuata = false;
    //alert('Sei stato disconnesso.');
  }
}


