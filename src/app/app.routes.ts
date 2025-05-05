import { Routes } from '@angular/router';
import { HelpSectionComponent } from './component/help-section/help-section.component';
import { Funzione1Component } from './component/funzione1/funzione1.component';
import { InitialPageComponent } from './component/initial-page/initial-page.component';
import { Funzione2Component } from './component/funzione2/funzione2.component';
import { MapComponent } from './component/map/map.component';
import { PagamentoComponent } from './component/pagamento/pagamento.component';
import { CarrelloComponent } from './component/carrello/carrello.component';
import { LoginComponent } from './component/login/login.component';
import { SigninComponent } from './component/signin/signin.component';
import { RegistrazioneComponent } from './component/registrazione/registrazione.component';


export const routes: Routes = [
  
  { path: '', redirectTo: '/registrazione', pathMatch: 'full' },
  { path: 'help-section', component: HelpSectionComponent},
  
  { path: 'funzione1', component: Funzione1Component},
  { path: 'carrello', component: CarrelloComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'registrazione', component: RegistrazioneComponent},

  { path: 'pagamento', component: PagamentoComponent},
  { path: 'funzione2', component: Funzione2Component},
  { path: 'initial-page', component: InitialPageComponent},
  {path: 'map', component: MapComponent} // Redirect to initial page for any other route
];

