import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarAgentComponent } from '../navbar-agent/navbar-agent.component';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { NavbarGuestComponent } from '../navbar-guest/navbar-guest.component';
import { NavbarAmministratorComponent } from '../navbar-amministrator/navbar-amministrator.component';
import { NavbarCeoComponent } from '../navbar-ceo/navbar-ceo.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
    NavbarAgentComponent,
    NavbarUserComponent,
    NavbarGuestComponent,
    NavbarAmministratorComponent,
    NavbarCeoComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDropdownOpen = false;
  @Input() helpMessage: string = '';
  @Input() centerMessage: string = '';
  isHelpOpen = false;
  userRole: 'guest' | 'agent' | 'user' | 'ceo' | 'admin' = 'guest';

  constructor(private router: Router,private authService: AuthService) {}


  ngOnInit(): void {
    this.userRole = this.authService.getUserRoleFromToken();
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleHelp() {
    this.isHelpOpen = !this.isHelpOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.user');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  goToNewAnnouncement() {
    this.router.navigate(['/new-announcement']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
