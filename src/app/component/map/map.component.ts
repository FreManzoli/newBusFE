import { Component, OnInit } from '@angular/core';
import { GeocodingService } from '../geocoding/geocoding.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

@Component({
    selector: 'app-map',
    imports: [RouterLink,FormsModule],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    data: any;
    quantity: number = 0;
    private map: L.Map | undefined;
    

    constructor(private router: Router, private geocoding: GeocodingService,private cartService: CartService) {
        // Recupera i dati passati tramite lo stato del router
        const navigation = this.router.getCurrentNavigation();
        this.data = navigation?.extras.state?.['data'];
    }
    


    ngOnInit(): void {
      if (this.data && this.data.partenza && this.data.arrivo) {
        console.log('Contenuto di this.data:', this.data);
        // Ottieni le coordinate di partenza
        this.geocoding.getCoordinates(this.data.partenza).subscribe(partenzaCoord => {
          // Ottieni le coordinate di arrivo
          this.geocoding.getCoordinates(this.data.arrivo).subscribe(arrivoCoord => {
            // Inizializza la mappa con le coordinate di partenza e arrivo
            this.initMap(partenzaCoord.lat, partenzaCoord.lon, arrivoCoord.lat, arrivoCoord.lon);
          });
        });
      } else {
        console.error('Dati di partenza o arrivo mancanti.');
        alert('Errore: dati di partenza o arrivo non disponibili.');
      }
    }

  private initMap(latPartenza: number, lonPartenza: number, latArrivo: number, lonArrivo: number): void {
    // Crea la mappa centrata sulla partenza
    this.map = L.map('map').setView([latPartenza, lonPartenza], 13);

    // Aggiungi il layer della mappa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Aggiungi il controllo di routing con i waypoint
    (L as any).Routing.control({
    waypoints: [
        L.latLng(latPartenza, lonPartenza),
        L.latLng(latArrivo, lonArrivo)
    ],
    routeWhileDragging: false,
   }).addTo(this.map);
  }    

  // Aggiungi il viaggio al carrello
  addToCart(): void {
     if (!this.data || !this.data.id_viaggio || this.quantity <= 0) {
       alert('Errore: dati del viaggio mancanti o quantità non valida.');
       return;
     }

    const idUtente = '5c10ff5b-25fc-4846-a308-f5d22501f2eb'; // Sostituisci con l'ID utente reale (es. recuperato da un servizio di autenticazione)
    const idViaggio = this.data.id_viaggio;

    this.cartService.addViaggioToCarrello(idUtente, idViaggio, this.quantity).subscribe({
      next: () => {
        this.router.navigate(['/carrello']);
        alert('Viaggio aggiunto al carrello con successo!');
      },
      error: (err) => {
        console.error('Errore durante l\'aggiunta al carrello:', err);
        alert('Errore durante l\'aggiunta al carrello. Riprova.');
      }
    });
  }
}
