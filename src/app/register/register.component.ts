import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, FooterComponent, HttpClientModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Le password non corrispondono!');
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (res) => {
        console.log('Registrazione avvenuta con successo', res);
        alert('Registrazione completata!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Errore nella registrazione:', err);
        alert('Errore nella registrazione: ' + (err.error?.message || 'Riprova più tardi'));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:3002/auth/google';
  }
}
