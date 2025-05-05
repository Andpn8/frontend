import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarGuestComponent } from '../navbar-guest/navbar-guest.component';
import { NavbarComponent } from '../navbar-agent/navbar-agent.component';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { NavbarCeoComponent } from '../navbar-ceo/navbar-ceo.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    SearchBarComponent, SearchHistoryComponent, FooterComponent,
    NavbarGuestComponent, NavbarComponent, NavbarUserComponent,
    NavbarCeoComponent, CommonModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  userRole: 'guest' | 'agent' | 'user' | 'ceo' = 'guest';

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
