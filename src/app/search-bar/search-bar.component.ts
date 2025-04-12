import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule,CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  filtersVisible: boolean = false;
  confirmationVisible: boolean = false;

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
  
}



