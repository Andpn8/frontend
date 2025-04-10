import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  ruolo: 'ospite' | 'utente' | 'agente' | 'admin' = 'ospite';
}
