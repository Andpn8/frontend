import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agency-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './agency-login.component.html',
  styleUrls: ['./agency-login.component.scss']
})
export class AgencyLoginComponent {
  piva: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    
    this.authService.loginAgency(this.piva, this.password).subscribe({
      next: (res) => {
        console.log('Login agenzia riuscito', res);
        localStorage.setItem('token', res.token);
        alert('Login agenzia effettuato con successo!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Errore login agenzia:', err);
        alert('Credenziali errate o errore nel server.');
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
