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

  showConfirmDialog: boolean = false;
  showResultDialog: boolean = false;
  confirmMessage: string = '';
  resultTitle: string = '';
  resultMessage: string = '';
  currentAction: string = '';
  currentAgent: User | null = null;

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

  confirmAction(action: string, agent: User): void {
    this.currentAction = action;
    this.currentAgent = agent;
    
    switch(action) {
      case 'promote':
        this.confirmMessage = `Sei sicuro di voler promuovere ${agent.name} ad Amministratore?`;
        break;
      case 'demote':
        this.confirmMessage = `Sei sicuro di voler declassare ${agent.name} ad Agente?`;
        break;
      case 'fireAgent':
      case 'fireAdmin':
        this.confirmMessage = `Sei sicuro di voler licenziare ${agent.name}?`;
        break;
    }

    this.showConfirmDialog = true;
  }

  proceedAction(): void {
    if (!this.currentAgent) return;
    
    this.showConfirmDialog = false;
    
    switch(this.currentAction) {
      case 'promote':
        this.promoteAgent(this.currentAgent.id);
        break;
      case 'demote':
        this.demoteAdmin(this.currentAgent.id);
        break;
      case 'fireAgent':
        this.fireAgent(this.currentAgent.id);
        break;
      case 'fireAdmin':
        this.fireAdmin(this.currentAgent.id);
        break;
    }
  }

  cancelAction(): void {
    this.showConfirmDialog = false;
    this.currentAction = '';
    this.currentAgent = null;
  }

  showSuccessResult(message: string): void {
    this.resultTitle = 'Operazione completata';
    this.resultMessage = message;
    this.showResultDialog = true;
  }

  showErrorResult(message: string): void {
    this.resultTitle = 'Errore';
    this.resultMessage = message;
    this.showResultDialog = true;
  }

  closeResultDialog(): void {
    this.showResultDialog = false;
    this.resultTitle = '';
    this.resultMessage = '';
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
        () => {
          this.showSuccessResult('Agente licenziato con successo');
          this.loadAgents();
        },
        error => {
          console.error('Errore durante la licenza dell\'agente', error);
          this.showErrorResult('Errore durante il licenziamento dell\'agente');
        }
      );
    } else {
      console.warn('Permesso negato per licenziare agenti');
      this.showErrorResult('Permesso negato per licenziare agenti');
    }
  }

  fireAdmin(adminId: string): void {
    if (!adminId) {
      console.error('ID amministratore mancante.');
      this.showErrorResult('ID amministratore mancante');
      return;
    }

    if (this.currentUserRole === 'CEO') {
      this.agentService.deleteAdmin(adminId).subscribe(
        () => {
          this.showSuccessResult('Amministratore licenziato con successo');
          this.loadAgents();
        },
        error => {
          console.error('Errore durante la licenza dell\'amministratore', error);
          this.showErrorResult('Errore durante il licenziamento dell\'amministratore');
        }
      );
    } else {
      console.warn('Permesso negato per licenziare amministratori');
      this.showErrorResult('Permesso negato per licenziare amministratori');
    }
  }

  promoteAgent(agentId: string): void {
    if (this.currentUserRole === 'CEO' || this.currentUserRole === 'Amministratore') {
      this.agentService.promoteAgent(agentId).subscribe(
        () => {
          this.showSuccessResult('Agente promosso a amministratore con successo');
          this.loadAgents();
        },
        error => {
          console.error('Errore durante la promozione dell\'agente', error);
          this.showErrorResult('Errore durante la promozione dell\'agente');
        }
      );
    } else {
      console.warn('Permesso negato per promuovere agenti');
      this.showErrorResult('Permesso negato per promuovere agenti');
    }
  }

  demoteAdmin(adminId: string): void {
    if (this.currentUserRole === 'CEO') {
      this.agentService.demoteAdmin(adminId).subscribe(
        () => {
          this.showSuccessResult('Amministratore declassato con successo');
          this.loadAgents();
        },
        error => {
          console.error('Errore durante il declassamento dell\'amministratore', error);
          this.showErrorResult('Errore durante il declassamento dell\'amministratore');
        }
      );
    } else {
      console.warn('Permesso negato per declassare amministratori');
      this.showErrorResult('Permesso negato per declassare amministratori');
    }
  }
}