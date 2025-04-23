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
    }, 3000); // Andrea, qui il messaggio sparisce dopo 3s
  }

  closeAndReset(): void {
    this.resetFilters();
    this.filtersVisible = false;
    this.cdr.detectChanges(); // Forza l'aggiornamento della vista
  }

  resetFilters(): void {
    // Cambiato da 0 a null per resettare i valori e far riapparire i placeholder
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
  }
}
