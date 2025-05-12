import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AgentService } from '../../services/agent.service';

interface User {
  id: string;
  name: string;
  hiredDate: string;
  role: 'Agente' | 'Amministratore';
}

@Component({
  selector: 'app-manage-agent',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './manage-agent.component.html',
  styleUrls: ['./manage-agent.component.scss']
})
export class ManageAgentComponent implements OnInit {
  agents: User[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  currentUserName: string = 'Andrea Pinto'; 
  currentUserRole: 'Amministratore' | 'CEO' = 'Amministratore';

  constructor(private router: Router, private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

 loadAgents(): void {
  this.agentService.getAllUsers().subscribe(([agents, admins]) => {
    const normalizedAgents = agents.map((agent: any) => ({
      id: agent.id,
      name: agent.nome || agent.name || 'Sconosciuto',
      hiredDate: agent.createdAt ? new Date(agent.createdAt).toLocaleDateString() : '',
      role: 'Agente'
    }));

    const normalizedAdmins = admins.map((admin: any) => ({
      id: admin.id,
      name: admin.nome || admin.name || 'Sconosciuto',
      hiredDate: admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '',
      role: 'Amministratore'
    }));

    this.agents = [...normalizedAgents, ...normalizedAdmins];
  });
}

  goBack(): void {
    this.router.navigate(['/home']);
  }

  // 🟡 Paginazione
  get paginatedAgents(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.agents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.agents.length / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalAgents(): number {
    return this.agents.filter(agent => agent.role === 'Agente').length;
  }

  get totalAdmins(): number {
    return this.agents.filter(agent => agent.role === 'Amministratore').length;
  }
}
