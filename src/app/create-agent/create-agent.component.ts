import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss']
})
export class CreateAgentComponent {
  agentData = {
    role: 'agent',
    name: '',
    password: ''
  };

  showConfirmation = false;
  confirmationMessage = '';
  confirmationId = '';
  confirmationPassword = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
  const { role, name, password } = this.agentData;

  const onSuccess = (id: number, tipo: 'Agente' | 'Amministratore') => {
    this.confirmationId = id.toString();
    this.confirmationPassword = password;
    this.confirmationMessage = `Nuovo account ${tipo.toLowerCase()} creato con successo!`;
    this.showConfirmation = true;
  };

  if (role === 'agent') {
    this.authService.createAgent({ nome: name, password }).subscribe({
      next: (res) => {
        const id = res.agente.agente_id;
        onSuccess(id, 'Agente');
      },
       error: (err: any) => {
          console.error('Errore durante la creazione agente:', err);
          this.snackBar.open(err.error?.message || 'Errore nella creazione dell’agente', 'Chiudi', {
            duration: 3000
          });
        }
      });
  } else if (role === 'admin') {
    this.authService.createAdmin({ nome: name, password }).subscribe({
      next: (res) => {
        const id = res.amministratore.amministratore_id;
        onSuccess(id, 'Amministratore');
      },
      error: (err: any) => {
          console.error('Errore durante la creazione admin:', err);
          this.snackBar.open(err.error?.message || 'Errore nella creazione dell’amministratore', 'Chiudi', {
            duration: 3000
          });
        }
      });
  } else {
      this.snackBar.open('Ruolo non valido selezionato.', 'Chiudi', {
        duration: 3000
      });
    }
  }


  confirmAndRedirect() {
    this.showConfirmation = false;
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
