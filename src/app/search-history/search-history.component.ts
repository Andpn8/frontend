import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  @Input() searchHistory: FilterSet[] = [];
  @Output() restoreFilters = new EventEmitter<FilterSet>();

  applyFilters(filters: FilterSet): void {
    this.restoreFilters.emit(filters);
  }

  hasServices(services: FilterSet["services"]): boolean {
    return Object.values(services).some(v => v);
  }

  listServices(services: FilterSet["services"]): string {
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
