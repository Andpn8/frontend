import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SearchHistoryComponent } from "../search-history/search-history.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarGuestComponent } from "../navbar-guest/navbar-guest.component";
import { NavbarComponent } from "../navbar-agent/navbar-agent.component";
import { NavbarUserComponent } from "../navbar-user/navbar-user.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [SearchBarComponent, SearchHistoryComponent, FooterComponent, NavbarGuestComponent, NavbarComponent, NavbarUserComponent,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  userRole: 'guest' | 'agent' | 'user' = 'guest';

  constructor() {
    const isLogged = false; 
    const isAgent = false;

    if (!isLogged) {
      this.userRole = 'guest';
    } else if (isAgent) {
      this.userRole = 'agent';
    } else {
      this.userRole = 'user';
    }
  }
}
