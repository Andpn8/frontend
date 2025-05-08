import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login-amministrator',
  standalone: true,
  imports: [FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './login-amministrator.component.html',
  styleUrls: ['./login-amministrator.component.scss']
})
export class LoginAmministratorComponent {
  adminId: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.authService.loginAmministrator(Number(this.adminId), this.password).subscribe({
      next: (res) => {
        console.log('Login amministratore riuscito', res);
        localStorage.setItem('token', res.token);
        alert('Login amministratore effettuato con successo!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Errore login amministratore:', err);
        alert('Credenziali errate o errore nel server.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToAgentLogin(): void{
    this.router.navigate(['/loginAgent']);
  }
  
  goToRegisterAgency(): void {
    this.router.navigate(['/registerAgency']);
  }

  goToCeoLogin(): void {
    this.router.navigate(['/loginAgency']);
  }
}
