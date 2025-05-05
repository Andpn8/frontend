import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-manage-agent',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './manage-agent.component.html',
  styleUrls: ['./manage-agent.component.scss']
})
export class ManageAgentComponent {
  agents = [
    { hiredDate: '15/02/2021', name: 'Paolo Amadori', role: 'Agente' },
    { hiredDate: '18/06/2022', name: 'Cristiano Spadaccino', role: 'Amministratore' },
    { hiredDate: '11/06/2022', name: 'Luca Rea', role: 'Agente' },
    { hiredDate: '16/08/2023', name: 'Giovanni Guida', role: 'Agente' },
    { hiredDate: '17/04/2024', name: 'Sebastiano Sannino', role: 'Amministratore' },
    { hiredDate: '11/07/2021', name: 'Giuseppe Rossi', role: 'Agente' },
    { hiredDate: '28/10/2021', name: 'Andrea Pinto', role: 'BOSS' }
  ];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
