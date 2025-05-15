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
  searchHistory: FilterSet[] = [];
  restoredFilters: FilterSet | null = null;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

 ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.userRole = this.authService.getUserRoleFromToken();

    const savedHistory = sessionStorage.getItem('searchHistory');
    if (savedHistory) {
      this.searchHistory = JSON.parse(savedHistory);
    }

    const restored = sessionStorage.getItem('restoredFilters');
    if (restored) {
      this.restoredFilters = JSON.parse(restored);
    }
  }
}

   onFiltersApplied(newFilters: FilterSet): void {
  if (this.searchHistory.length >= 3) {
    this.searchHistory.shift();
  }
  this.searchHistory.push(newFilters);
  sessionStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
}

 onRestoreFilters(filters: FilterSet): void {
  this.restoredFilters = filters;
  sessionStorage.setItem('restoredFilters', JSON.stringify(filters));
}
}
