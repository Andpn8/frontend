import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from "./footer/footer.component";
import { SearchHistoryComponent } from "./search-history/search-history.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SearchBarComponent, FooterComponent, SearchHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  ruolo: 'ospite' | 'utente' | 'agente' | 'admin' = 'ospite';
}
