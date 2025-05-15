import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  filtersVisible = false;
  confirmationVisible = false;
  citySelected: boolean = false;

  minPrice: number | null = null;
  maxPrice: number | null = null;
  rooms: number | null = null;
  bathrooms: number | null = null;
  location: string = '';
  minSurface: number | null = null;
  maxSurface: number | null = null;
  energyClass: string = 'tutte';
  services = {
    portineria: false,
    garage: false,
    climatizzazione: false,
    sicurezza: false,
    ascensore: false,
    accessoDisabili: false
  };

  allCities: string[] = [
    "Napoli", "Roma", "Milano", "Torino", "Palermo", "Genova", "Bologna", "Firenze", "Bari", "Catania",
    "Venezia", "Verona", "Messina", "Padova", "Trieste", "Brescia", "Prato", "Parma", "Modena", "Cagliari",
    "Livorno", "Reggio Calabria", "Rimini", "Perugia", "Salerno", "Ferrara", "Sassari", "Monza", "Pescara", 
    "Vercelli", "Vicenza", "Latina", "Lecce", "Siena", "Cosenza", "Ravenna", "Trapani", "Brindisi", "Pisa"
  ];

  filteredCities: string[] = [];
  isSearchEnabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleFilters(apply: boolean = false): void {
    this.filtersVisible = !this.filtersVisible;

    if (!this.filtersVisible && apply) {
      this.showConfirmation();
    }
  }

  showConfirmation(): void {
    this.confirmationVisible = true;
    setTimeout(() => {
      this.confirmationVisible = false;
    }, 3000);
  }

  closeAndReset(): void {
    this.resetFilters();
    this.filtersVisible = false;
    this.cdr.detectChanges();
  }

  resetFilters(): void {
    this.minPrice = null;
    this.maxPrice = null;
    this.rooms = null;
    this.bathrooms = null;
    this.location = '';
    this.minSurface = null;
    this.maxSurface = null;
    this.energyClass = 'tutte';
    this.services = {
      portineria: false,
      garage: false,
      climatizzazione: false,
      sicurezza: false,
      ascensore: false,
      accessoDisabili: false
    };
    this.updateSearchButtonState();
  }

  onSearchChange(): void {
    if (this.location.trim().length > 0) {
      this.filteredCities = this.allCities.filter(city =>
        city.toLowerCase().includes(this.location.toLowerCase())
      );
    } else {
      this.filteredCities = [];
    }
    this.citySelected = false;
    this.updateSearchButtonState();
  }

  onCitySelect(city: string): void {
    this.location = city;
    this.filteredCities = [];
    this.citySelected = true;
    this.updateSearchButtonState();
  }

  updateSearchButtonState(): void {
    this.isSearchEnabled = this.citySelected && this.location.trim().length > 0;
  }

  onSearchClick(): void {
    console.log('Searching for', this.location);
  }

  onMinPriceChange(): void {
  if (this.minPrice != null && this.minPrice >= 0 && this.minPrice <= 9999999) {
    if (this.maxPrice == null || this.maxPrice <= this.minPrice) {
      this.maxPrice = this.minPrice + 1;
    }
  }
}

onMinSurfaceChange(): void {
  if (this.minSurface != null && this.minSurface >= 0 && this.minSurface <= 999) {
    if (this.maxSurface == null || this.maxSurface <= this.minSurface) {
      this.maxSurface = this.minSurface + 1;
    }
  }
}


}