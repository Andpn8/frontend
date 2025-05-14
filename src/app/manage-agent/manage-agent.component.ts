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
       this.agencyId = decoded.agenzia_id || decoded.agencyId || null;
    }
  } catch (e) {
    console.error('Errore nel decoding del token:', e);
  }
}

  loadAgents(): void {
  this.agentService.getAllUsers().subscribe(([agents, admins]) => {
    const normalizedAgents = agents
      .filter((agent: any) => agent.agencyId === this.agencyId) 
      .map((agent: any) => ({
        id: agent.agentId,
        name: agent.nome || agent.name || 'Sconosciuto',
        hiredDate: agent.createdAt ? new Date(agent.createdAt).toLocaleDateString() : '',
        role: 'Agente'
      }));

    const normalizedAdmins = admins
      .filter((admin: any) => admin.agenzia_id === this.agencyId) 
      .map((admin: any) => ({
        id: admin.amministratore_id,
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

 fireAgent(agentId: string): void {
  if (this.currentUserRole === 'CEO' || this.currentUserRole === 'Amministratore') {
    this.agentService.deleteAgent(agentId).subscribe(
      response => {
        console.log('Agente licenziato con successo', response);
        this.loadAgents(); // Ricarica gli agenti dopo l'eliminazione
      },
      error => {
        console.error('Errore durante la licenza dell\'agente', error);
      }
    );
  } else {
    console.warn('Permesso negato per licenziare agenti');
  }
}

fireAdmin(adminId: string): void {
  if (!adminId) {
    console.error('ID amministratore mancante.');
    return;
  }

  if (this.currentUserRole === 'CEO') {
    this.agentService.deleteAdmin(adminId).subscribe(
      response => {
        console.log('Amministratore licenziato con successo', response);
        this.loadAgents(); // Ricarica gli amministratori dopo l'eliminazione
      },
      error => {
        console.error('Errore durante la licenza dell\'amministratore', error);
      }
    );
  }
}

promoteAgent(agentId: string): void {
  if (this.currentUserRole === 'CEO' || this.currentUserRole === 'Amministratore') {
    this.agentService.promoteAgent(agentId).subscribe(
      response => {
        console.log('Agente promosso a amministratore con successo', response);
        this.loadAgents(); // Ricarica gli agenti dopo la promozione
      },
      error => {
        console.error('Errore durante la promozione dell\'agente', error);
      }
    );
  } else {
    console.warn('Permesso negato per promuovere agenti');
  }
}

demoteAdmin(adminId: string): void {
  if (this.currentUserRole === 'CEO') {
    this.agentService.demoteAdmin(adminId).subscribe(
      response => {
        console.log('Amministratore declassato con successo', response);
        this.loadAgents(); // Ricarica gli agenti dopo il declassamento
      },
      error => {
        console.error('Errore durante il declassamento dell\'amministratore', error);
      }
    );
  } else {
    console.warn('Permesso negato per declassare amministratori');
  }
}
}
