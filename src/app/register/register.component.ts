import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, FooterComponent,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Le password non corrispondono!');
      return;
    }
    console.log('Username:', this.username, 'Email:', this.email, 'Password:', this.password);
    // Qui metti la logica reale per la registrazione
  }

  goBack(): void {
    this.router.navigate(['/']); // Oppure il percorso desiderato
  }

  goToLogin(): void {
    this.router.navigate(['/login']); // Vai alla pagina di login
  }
}
