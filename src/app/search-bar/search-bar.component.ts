import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  filtersVisible: boolean = false;
  confirmationVisible: boolean = false;

  // Variabili per i prezzi
  minPrice: number = 0;
  maxPrice: number = 0;

  //Variabili per superfici
  minSurface: number = 0;
  maxSurface: number = 0;

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  // Mostra il messaggio di conferma quando si applicano i filtri
  showConfirmation() {
    this.confirmationVisible = true;
    setTimeout(() => {
      this.confirmationVisible = false;
    }, 3000); // Nasconde il messaggio dopo 3 secondi
  }

  // Funzione per aggiornare il prezzo massimo in base al prezzo minimo
  updateMaxPrice() {
    if (this.minPrice > this.maxPrice) {
      this.maxPrice = this.minPrice;
    }
  }
  updateMaxSurface() {
    if (this.minSurface > this.maxSurface) {
      this.maxSurface = this.minSurface;
    }
  }
}

