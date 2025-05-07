import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarGuestComponent } from '../navbar-guest/navbar-guest.component';
import { NavbarAgentComponent } from '../navbar-agent/navbar-agent.component';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { NavbarCeoComponent } from '../navbar-ceo/navbar-ceo.component';
import { AuthService } from '../../services/auth.service';
import { NavbarAmministratorComponent } from '../navbar-amministrator/navbar-amministrator.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    SearchBarComponent, SearchHistoryComponent, FooterComponent,
    NavbarGuestComponent, NavbarAgentComponent, NavbarUserComponent,
    NavbarCeoComponent, NavbarAmministratorComponent, CommonModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  userRole: 'guest' | 'agent' | 'user' | 'ceo' | 'admin' = 'guest';

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = this.authService.getUserRoleFromToken();
    }
  }
}
