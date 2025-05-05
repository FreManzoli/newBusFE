import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MapComponent } from './component/map/map.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
