import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-agent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-agent.component.html',
  styleUrls: ['./navbar-agent.component.scss']
})
export class NavbarAgentComponent {
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

  goToNewAnnouncement() {
    this.router.navigate(['/new-announcement']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToNotify() {
    this.router.navigate(['/notify']);
  }

  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']); 
  }
}
