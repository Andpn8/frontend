import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss'
})
export class NavbarUserComponent {
  isDropdownOpen = false;
  isHelpOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {} 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleHelp() {
    this.isHelpOpen = !this.isHelpOpen;
  }

  @Input() isGeneric: boolean = false;
  @Input() helpMessage: string = '';
  @Input() centerMessage: string = '';

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.user');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }

    const clickedInsideHelp = (event.target as HTMLElement).closest('.icon');
    if (!clickedInsideHelp) {
      this.isHelpOpen = false;
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToNotify() {
    this.router.navigate(['/notify']);
  }

  goToProfileInfo() {
    this.router.navigate(['/profile-info']);
  }


  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']); 
  }
}
