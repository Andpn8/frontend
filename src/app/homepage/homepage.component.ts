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

  if (this.searchHistory.length >= 3) this.searchHistory.shift();
  this.searchHistory.push(newFilters);

  this.filtriService.salvaFiltri(userId.toString(), newFilters).subscribe();
}

onRestoreFilters(filters: FilterSet): void {
  this.restoredFilters = filters;
}
}
