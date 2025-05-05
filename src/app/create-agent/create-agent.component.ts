import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  // logica da implementare in seguito
  onSubmit() {
    console.log('Dati inseriti:', this.agentData);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
