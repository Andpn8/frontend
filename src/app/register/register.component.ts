import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, FooterComponent, HttpClientModule, NavbarComponent,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  isError: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

   private showToastMessage(message: string, isError: boolean = false): void {
    this.toastMessage = message;
    this.isError = isError;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.showToastMessage('Le password non corrispondono!', true);
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (res) => {
        console.log('Registrazione avvenuta con successo', res);
        this.showToastMessage('Registrazione completata con successo!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error('Errore nella registrazione:', err);
        const errorMessage = err.error?.message || 'Errore durante la registrazione. Riprova più tardi.';
        this.showToastMessage(errorMessage, true);
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

  loginWithFacebook(): void {
    window.location.href = 'http://localhost:3002/auth/facebook';
  }

  loginWithGitHub(): void {
    window.location.href = 'http://localhost:3002/auth/github';
  }
}
