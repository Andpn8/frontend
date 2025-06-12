import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-agency',
  standalone: true,
  imports: [FormsModule, FooterComponent, NavbarComponent,CommonModule],
  templateUrl: './register-agency.component.html',
  styleUrls: ['./register-agency.component.scss']
})
export class RegisterAgencyComponent {
  agencyName: string = '';
  ceoName: string = '';
  pIva: string = '';
  password: string = '';
  confirmPassword: string = '';
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

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.showToastMessage('Le password non corrispondono!', true);
      return;
    }

    const agencyData = {
      nomeAgenzia: this.agencyName,
      nomeCeo: this.ceoName,
      piva: this.pIva,
      password: this.password
    };

    this.authService.registerAgency(agencyData).subscribe({
      next: (res) => {
         console.log('Registrazione avvenuta con successo', res);
        this.showToastMessage('Registrazione completata con successo!');
        setTimeout(() => {
          this.router.navigate(['/loginAgency']);
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

  goToLoginAgency(): void {
    this.router.navigate(['/loginAgency']);
  }
}
