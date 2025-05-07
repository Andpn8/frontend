import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-guest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-guest.component.html',
  styleUrl: './navbar-guest.component.scss'
})
export class NavbarGuestComponent {
  isDropdownOpen = false;
  isHelpOpen = false;

  constructor(private router: Router) {} 

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

  goToLogin(){
    this.router.navigate(['login'])
  }

  goToRegister(){
    this.router.navigate(['register'])
  }

}
