import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component"; // <-- Importa il servizio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent, NavbarComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
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

  login(): void {
  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      console.log('Login riuscito', res);
      localStorage.setItem('token', res.token);
      this.showToastMessage('Login effettuato con successo!');
      
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    },
    error: (err) => {
      console.error('Errore nel login:', err);
      this.showToastMessage('Credenziali errate o errore nel server.', true);
    }
  });
}

  goBack(): void {
    this.router.navigate(['/']); 
  }

  goToRegister(): void {
    this.router.navigate(['/register']); 
  }
  
  goToAgentLogin(): void {
    this.router.navigate(['/loginAgent']);
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

