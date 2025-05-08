import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component"; // <-- Importa il servizio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService // <-- Inietta il servizio
  ) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login riuscito', res);
        localStorage.setItem('token', res.token);
        alert('Login effettuato con successo!');
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error('Errore nel login:', err);
        alert('Credenziali errate o errore nel server.');
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
}

