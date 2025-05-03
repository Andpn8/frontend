import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-agent',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login-agent.component.html',
  styleUrls: ['./login-agent.component.scss']
})
export class LoginAgentComponent {
  agentId: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    /*
    this.authService.loginAgent(this.agentId, this.password).subscribe({
      next: (res) => {
        console.log('Login agente riuscito', res);
        localStorage.setItem('token', res.token);
        alert('Login agente effettuato con successo!');
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error('Errore login agente:', err);
        alert('Credenziali errate o errore nel server.');
      }
    });
    */
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToRegisterAgency(): void {
    this.router.navigate(['/registerAgency']);
  }
}
