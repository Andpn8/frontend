import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from "./footer/footer.component";
import { SearchHistoryComponent } from "./search-history/search-history.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent, FooterComponent, SearchHistoryComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  ruolo: 'ospite' | 'utente' | 'agente' | 'admin' = 'ospite';
}
