import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insertion',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './insertion.component.html',
  styleUrls: ['./insertion.component.scss']
})
export class InsertionComponent implements OnInit, AfterViewInit {
  annuncio: any;
  modalitaCatalogo: 'vendita' | 'affitto' = 'vendita';
  images: string[] = [];
  selectedImage: string = '';
  planimetrie: string[] = [];
  selectedPlanimetria: string = '';

  @ViewChild('headerContent') headerContent!: ElementRef<HTMLDivElement>;
  headerWidth: number = 0;

  mostraPopupVisita: boolean = false;
  selectedDate: string = '';
  selectedHour: string = '';
  selectedMinute: string = '';
  mostraPopupPrezzo: boolean = false;
  propostaPrezzo: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.annuncio = navigation?.extras?.state?.['annuncio'];
    this.modalitaCatalogo = navigation?.extras?.state?.['modalitaCatalogo'] || 'vendita';

    if (!this.annuncio) {
      this.router.navigate(['/catalog']);
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.annuncio) {
        if (this.annuncio.foto) {
          this.images = typeof this.annuncio.foto === 'string'
            ? this.annuncio.foto.split(',')
            : this.annuncio.foto;
          this.selectedImage = this.images[0];
        }

        if (this.annuncio.planimetrie) {
          this.planimetrie = typeof this.annuncio.planimetrie === 'string'
            ? this.annuncio.planimetrie.split(',')
            : this.annuncio.planimetrie;
          this.selectedPlanimetria = this.planimetrie[0];
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.headerWidth = this.headerContent.nativeElement.offsetWidth;
    window.addEventListener('resize', () => {
      this.headerWidth = this.headerContent.nativeElement.offsetWidth;
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  selectImage(index: number): void {
    this.selectedImage = this.images[index];
  }

  prevImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const prevIndex = currentIndex === 0 ? this.images.length - 1 : currentIndex - 1;
    this.selectedImage = this.images[prevIndex];
  }

  nextImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const nextIndex = currentIndex === this.images.length - 1 ? 0 : currentIndex + 1;
    this.selectedImage = this.images[nextIndex];
  }

  selectPlanimetria(index: number): void {
    this.selectedPlanimetria = this.planimetrie[index];
  }

  prevPlanimetria(): void {
    const currentIndex = this.planimetrie.indexOf(this.selectedPlanimetria);
    const prevIndex = currentIndex === 0 ? this.planimetrie.length - 1 : currentIndex - 1;
    this.selectedPlanimetria = this.planimetrie[prevIndex];
  }

  nextPlanimetria(): void {
    const currentIndex = this.planimetrie.indexOf(this.selectedPlanimetria);
    const nextIndex = currentIndex === this.planimetrie.length - 1 ? 0 : currentIndex + 1;
    this.selectedPlanimetria = this.planimetrie[nextIndex];
  }

  getServiziAttivi(servizi: { [key: string]: boolean }): string[] {
    return Object.entries(servizi)
      .filter(([_, attivo]) => attivo)
      .map(([chiave, _]) => this.formattaServizio(chiave));
  }

  formattaServizio(servizio: string): string {
    return servizio.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  inviaRichiestaVisita(): void {
    if (this.selectedDate && this.selectedHour && this.selectedMinute) {
      const orario = `${this.selectedHour.padStart(2, '0')}:${this.selectedMinute.padStart(2, '0')}`;
      console.log('📩 Richiesta inviata per il giorno:', this.selectedDate, 'alle:', orario);
      this.mostraPopupVisita = false;
    } else {
      alert("Per favore compila sia la data che l'orario prima di inviare.");
    }
  }

  inviaPropostaPrezzo(): void {
  if (this.propostaPrezzo && +this.propostaPrezzo > 0) {
    console.log(`📩 , proposta di prezzo inviata: €${this.propostaPrezzo}`);
    alert(`Grazie , la tua proposta di €${this.propostaPrezzo} è stata inviata!`);
    this.mostraPopupPrezzo = false;
    this.propostaPrezzo = '';
  } else {
    alert("Per favore inserisci una proposta valida prima di inviare.");
  }
}
}
