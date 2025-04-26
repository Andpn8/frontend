import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar-agent/navbar-agent.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SearchHistoryComponent } from "../search-history/search-history.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent, SearchBarComponent, SearchHistoryComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
