import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-create-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss']
})
export class CreateAgentComponent {
  agentData = {
    role: 'agent',
    name: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    const { role, name, password } = this.agentData;
  
    if (role === 'agent') {
      this.authService.createAgent({ nome: name, password }).subscribe({
        next: (res) => {
          console.log('Agente creato con successo:', res);
          alert('Agente creato con successo!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Errore durante la creazione agente:', err);
          alert(err.error?.message || 'Errore nella creazione dell’agente');
        }
      });
    } else if (role === 'admin') {
      this.authService.createAdmin({ nome: name, password }).subscribe({
        next: (res) => {
          console.log('Amministratore creato con successo:', res);
          alert('Amministratore creato con successo!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Errore durante la creazione admin:', err);
          alert(err.error?.message || 'Errore nella creazione dell’amministratore');
        }
      });
    } else {
      alert('Ruolo non valido selezionato.');
    }
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
