import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface FilterSet {
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  rooms: number | null;
  bathrooms: number | null;
  minSurface: number | null;
  maxSurface: number | null;
  energyClass: string;
  services: {
    portineria: boolean;
    garage: boolean;
    climatizzazione: boolean;
    sicurezza: boolean;
    ascensore: boolean;
    accessoDisabili: boolean;
  };
}

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})


export class SearchHistoryComponent {

  constructor(private authService: AuthService) {
  this.userRole = this.authService.getUserRoleFromToken();
}
  @Input() searchHistory: FilterSet[] = [];
  @Output() restoreFilters = new EventEmitter<FilterSet>();
  

  userRole: string = 'guest';
  
  confirmationVisible = false;

  applyFilters(filters: FilterSet): void {
    this.restoreFilters.emit(filters);
    this.showConfirmation();
  }

  showConfirmation(): void {
    this.confirmationVisible = true;
    setTimeout(() => {
      this.confirmationVisible = false;
    }, 3000);
  }

  hasServices(services: FilterSet["services"] | undefined): boolean {
    return services ? Object.values(services).some(v => v) : false;
  }

  listServices(services: FilterSet["services"] | undefined): string {
    if (!services) return '';

    const names = {
      portineria: 'Portineria',
      garage: 'Garage',
      climatizzazione: 'Climatizzazione',
      sicurezza: 'Sicurezza',
      ascensore: 'Ascensore',
      accessoDisabili: 'Accesso Disabili'
    };

    return Object.entries(services)
      .filter(([key, val]) => val)
      .map(([key]) => names[key as keyof typeof names])
      .join(', ');
  }
}