import { Component, ChangeDetectorRef, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterSet } from '../../models/filter-set.model';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() filtersApplied = new EventEmitter<FilterSet>();
  @Input() restoredFilters: FilterSet | null = null;
  @Input() showFilters: boolean = true;

  filtersVisible = false;
  confirmationVisible = false;
  citySelected: boolean = false;
  buyOrRent: 'sale' | 'rent' = 'sale';
  propertyType: string = 'Appartamento';

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

  filteredCities: string[] = [];
  isSearchEnabled: boolean = false;
  autocompleteService: any;
  sessionToken: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initGooglePlaces();
    if (this.restoredFilters) {
      this.applyFilterSet(this.restoredFilters);
    }
  }

  initGooglePlaces(): void {
    if (typeof google !== 'undefined') {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.sessionToken = new google.maps.places.AutocompleteSessionToken();
    }
  }

  getPlacePredictions(input: string): void {
    if (!this.autocompleteService || input.length < 2) {
      this.filteredCities = [];
      return;
    }

    this.autocompleteService.getPlacePredictions({
      input: input,
      types: ['(cities)'],
      componentRestrictions: { country: 'it' },
      sessionToken: this.sessionToken,
      language: 'it'
    }, (predictions: any[], status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        this.filteredCities = predictions
          .map(prediction => prediction.description.split(',')[0])
          .filter((value, index, self) => self.indexOf(value) === index); // Rimuove duplicati
      } else {
        this.filteredCities = [];
      }
      this.cdr.detectChanges();
    });
  }

  onSearchChange(): void {
    if (this.location.trim().length > 1) {
      this.getPlacePredictions(this.location);
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
    this.isSearchEnabled = this.location.trim().length > 0;
  }

  toggleFilters(apply: boolean = false): void {
    this.filtersVisible = !this.filtersVisible;

    if (!this.filtersVisible && apply) {
      const currentFilters: FilterSet = {
        location: this.location,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        rooms: this.rooms,
        bathrooms: this.bathrooms,
        minSurface: this.minSurface,
        maxSurface: this.maxSurface,
        energyClass: this.energyClass,
        services: { ...this.services }
      };
      this.filtersApplied.emit(currentFilters);
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

  onMinPriceChange(): void {
    if (this.minPrice != null && this.minPrice >= 0 && this.minPrice <= 9999999) {
      if (this.maxPrice == null || this.maxPrice <= this.minPrice) {
        this.maxPrice = this.minPrice + 1;
      }
    }
  }

  onMaxPriceChange(): void {
    if (this.maxPrice != null && this.maxPrice >= 0 && this.maxPrice <= 10000000) {
      if (this.minPrice != null && this.maxPrice < this.minPrice) {
        this.minPrice = this.maxPrice - 1;
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

  onMaxSurfaceChange(): void {
    if (this.maxSurface != null && this.maxSurface >= 0 && this.maxSurface <= 1000) {
      if (this.minSurface != null && this.maxSurface < this.minSurface) {
        this.minSurface = this.maxSurface - 1;
      }
    }
  }

  applyFilterSet(filters: FilterSet): void {
    this.location = filters.location;
    this.minPrice = filters.minPrice;
    this.maxPrice = filters.maxPrice;
    this.rooms = filters.rooms;
    this.bathrooms = filters.bathrooms;
    this.minSurface = filters.minSurface;
    this.maxSurface = filters.maxSurface;
    this.energyClass = filters.energyClass;
    this.services = { ...filters.services };
    this.citySelected = true;
    this.updateSearchButtonState();
  }

  get isApplyDisabled(): boolean {
    return !(
      this.minPrice || this.maxPrice || this.rooms || this.bathrooms ||
      this.minSurface || this.maxSurface ||
      this.energyClass !== 'tutte' ||
      Object.values(this.services).some(v => v)
    );
  }

  goToCatalog() {
    const filters: FilterSet = {
      location: this.location,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      rooms: this.rooms,
      bathrooms: this.bathrooms,
      minSurface: this.minSurface,
      maxSurface: this.maxSurface,
      energyClass: this.energyClass,
      services: this.services,
      buyOrRent: this.buyOrRent,
      propertyType: this.propertyType,
    };

    this.router.navigate(['/catalog'], {
      queryParams: { filters: JSON.stringify(filters) }
    });
  }
}