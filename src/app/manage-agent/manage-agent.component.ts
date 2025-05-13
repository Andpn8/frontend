import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AgentService } from '../../services/agent.service';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

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

  currentUserName: string = 'Utente'; 
  currentUserRole: 'Amministratore' | 'CEO' = 'Amministratore';
  agencyId: string | null = null;

  constructor(
    private router: Router,
    private agentService: AgentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setUserInfo();
    this.loadAgents();
  }

 setUserInfo(): void {
  const token = this.authService.getToken();
  if (!token) return;

  try {
    const decoded: any = jwtDecode(token);

    if (decoded.agencyId) {
      this.currentUserRole = 'CEO';
      this.currentUserName = decoded.name || 'CEO Sconosciuto';
      this.agencyId = decoded.agencyId;
    } else if (decoded.amministratore_id) {
      this.currentUserRole = 'Amministratore';
      this.currentUserName = decoded.name || 'Admin Sconosciuto';
      this.agencyId = decoded.agencyId;
    }
  } catch (e) {
    console.error('Errore nel decoding del token:', e);
  }
}

  loadAgents(): void {
  this.agentService.getAllUsers().subscribe(([agents, admins]) => {
    const normalizedAgents = agents
      .filter((agent: any) => agent.agencyId === this.agencyId) // 👈 filtro
      .map((agent: any) => ({
        id: agent.id,
        name: agent.nome || agent.name || 'Sconosciuto',
        hiredDate: agent.createdAt ? new Date(agent.createdAt).toLocaleDateString() : '',
        role: 'Agente'
      }));

    const normalizedAdmins = admins
      .filter((admin: any) => admin.agenzia_id === this.agencyId) // 👈 filtro
      .map((admin: any) => ({
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
