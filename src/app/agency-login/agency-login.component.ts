import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-agency-login',
  standalone: true,
  imports: [FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.scss']
})
export class AgencyLoginComponent {
  piva: string = '';
  password: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  isError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  private showToastMessage(message: string, isError: boolean = false): void {
    this.toastMessage = message;
    this.isError = isError;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  login(): void {
    
    this.authService.loginAgency(this.piva, this.password).subscribe({
      next: (res) => {
        console.log('Login agenzia riuscito', res);
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

  goToRegisterAgency(): void {
    this.router.navigate(['/registerAgency']);
  }
}
