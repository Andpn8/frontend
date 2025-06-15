import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarGuestComponent } from '../navbar-guest/navbar-guest.component';
import { NavbarAgentComponent } from '../navbar-agent/navbar-agent.component';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { NavbarCeoComponent } from '../navbar-ceo/navbar-ceo.component';
import { AuthService } from '../../services/auth.service';
import { NavbarAmministratorComponent } from '../navbar-amministrator/navbar-amministrator.component';
import { FilterSet } from '../../models/filter-set.model';
import { FiltriService } from '../../services/filtri.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    SearchBarComponent, SearchHistoryComponent, FooterComponent,
    NavbarGuestComponent, NavbarAgentComponent, NavbarUserComponent,
    NavbarCeoComponent, NavbarAmministratorComponent, CommonModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  userRole: 'guest' | 'agent' | 'user' | 'ceo' | 'admin' = 'guest';
  restoredFilters: FilterSet | null = null;
  searchHistory: FilterSet[] = [];

  constructor(
    private authService: AuthService,
     private filtriService: FiltriService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

 ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.userRole = this.authService.getUserRoleFromToken();
   const userId = this.authService.getUserId();

  if (userId !== null) {
  this.filtriService.getFiltri(userId.toString()).subscribe(history => {
    this.searchHistory = history;
  });
}
  }
}

onFiltersApplied(newFilters: FilterSet): void {
  const userId = this.authService.getUserId();
  if (userId === null) {
    console.warn('Nessun userId disponibile, impossibile salvare il filtro.');
    return;
  }

  // Costruisci il filtro da salvare per il backend
  const filtroBackend = {
    user_id: userId,
    localita: newFilters.location,
    prezzo_minimo: newFilters.minPrice,
    prezzo_massimo: newFilters.maxPrice,
    numero_camere: newFilters.rooms,
    numero_bagni: newFilters.bathrooms,
    superfice_minima: newFilters.minSurface,
    superfice_massima: newFilters.maxSurface,
    classe_energetica: newFilters.energyClass,
    servizi: Object.entries(newFilters.services)
      .filter(([_, v]) => v)
      .map(([k]) => k)
  };

  // Se ci sono già 3 filtri salvati, elimina il più vecchio (per ID!)
  if (this.searchHistory.length >= 3) {
    const filtroDaEliminare = this.searchHistory.shift();
    
    if (filtroDaEliminare?.id != null) {
      this.filtriService.deleteFiltro(filtroDaEliminare.id).subscribe({
        next: () => console.log('Filtro più vecchio eliminato con successo'),
        error: err => console.error('Errore durante eliminazione filtro:', err)
      });
    } else {
      console.warn('Nessun ID disponibile per il filtro da eliminare');
    }
  }

  // Salva il nuovo filtro
  this.filtriService.salvaFiltri(userId.toString(), filtroBackend).subscribe({
    next: res => {
      const filtroConId: FilterSet = {
        ...newFilters,
        id: res.filtro?.id_filtro // Assicurati che il backend ritorni id_filtro
      };
      this.searchHistory.push(filtroConId);
      console.log('Nuovo filtro salvato con successo');
    },
    error: err => {
      console.error('Errore durante salvataggio filtro:', err);
    }
  });
}


onRestoreFilters(filters: FilterSet): void {
  this.restoredFilters = { ...filters };
  setTimeout(() => {
    this.restoredFilters = null;
    setTimeout(() => {
      this.restoredFilters = { ...filters };
    });
  });
}
}
