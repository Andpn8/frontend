import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarCeoComponent } from "../navbar-ceo/navbar-ceo.component";
import { NavbarUserComponent } from "../navbar-user/navbar-user.component";
import { NavbarAmministratorComponent } from "../navbar-amministrator/navbar-amministrator.component";
import { NavbarAgentComponent } from "../navbar-agent/navbar-agent.component";
import { NavbarGuestComponent } from "../navbar-guest/navbar-guest.component";
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    NavbarComponent
],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
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
