import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-agency',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './register-agency.component.html',
  styleUrls: ['./register-agency.component.scss']
})
export class RegisterAgencyComponent {
  agencyName: string = '';
  ceoName: string = '';
  pIva: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Le password non coincidono, Andrea!');
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
        console.log('Registrazione agenzia avvenuta', res);
        alert('Registrazione avvenuta con successo!');
        this.router.navigate(['/loginAgent']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Questa agenzia è già registrata, Andrea!');
        } else {
          console.error('Errore nella registrazione:', err);
          alert('Errore nella registrazione. Riprova.');
        }
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
