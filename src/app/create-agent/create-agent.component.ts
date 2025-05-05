import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    if (this.agentData.role === 'agent') {
      const { name, password } = this.agentData;

      this.authService.createAgent({ nome: name, password }).subscribe({
        next: (res) => {
          console.log('Agente creato con successo:', res);
          alert('Agente creato con successo!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Errore durante la creazione:', err);
          alert(err.error?.message || 'Errore nella creazione dell’agente');
        }
      });
    } else {
      alert('Ruolo non supportato al momento.');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
