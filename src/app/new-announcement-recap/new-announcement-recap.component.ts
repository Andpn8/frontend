import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../../services/componentServices/announcement-data.service';

@Component({
  selector: 'app-new-announcement-recap',
  standalone: true,
  templateUrl: './new-announcement-recap.component.html',
  styleUrls: ['./new-announcement-recap.component.scss'],
  imports: [NavbarComponent, AnnouncementSummaryComponent,CommonModule]
})
export class NewAnnouncementRecapComponent implements AfterViewInit {

  

  @ViewChild('headerContent') headerContent!: ElementRef;
  headerWidth = 0;
  titolo: string = '';
  indirizzo: string = '';
  numero: string = '';
  cap: string = '';
  citta: string = '';
  prezzo: string = '';
  superficie: number | null = null;
  piano: number | null = null;
  classeEnergetica: string = '';
  locali: number | null = null; 
  bagni: number | null = null;   
  descrizione: string = '';
  email: string = '';
  cellulare: string = ''; 
  servizi = [
  { label: 'Portineria', control: 'portineria' },
  { label: 'Garage', control: 'garage' },
  { label: 'Climatizzazione', control: 'climatizzazione' },
  { label: 'Sicurezza', control: 'sicurezza' },
  { label: 'Ascensore', control: 'ascensore' },
  { label: 'Accesso Disabili', control: 'accessoDisabili' }
];
serviziAttivi: string[] = [];
  images: string[] = [];
  selectedImage: string = '';
  planimetrie: string[] = [];
  selectedPlanimetria: string = '';

  constructor(private router: Router,private announcementDataService: AnnouncementDataService

    
  ) {} 

  ngAfterViewInit() {
    this.headerWidth = this.headerContent.nativeElement.offsetWidth;
    this.loadData();
  }

   loadData() {
    const data = this.announcementDataService.getData();

    if (data) {
      this.titolo = data.titolo || '';
      this.indirizzo = data.indirizzo || '';
      this.numero = data.numero || '';
      this.cap = data.cap || '';
      this.citta = data.citta || '';
      this.prezzo = data.prezzo || '';
      this.superficie = data.superficie || null;
      this.piano = data.piano || null;
      this.classeEnergetica = data.classeEnergetica || '';
      this.locali = data.locali || null;
      this.bagni = data.bagni || null;
      this.descrizione = data.descrizione || '';
      this.email = data.email || '';
      this.cellulare = data.cellulare || '';
      this.serviziAttivi = this.servizi
      .filter(servizio => data[servizio.control])
      .map(servizio => servizio.label);
    }
  }


  getServiziAttivi(serv: Record<string,boolean>): string[] {
    return Object.entries(serv).filter(([_,a])=>a).map(([n])=>n.replace(/_/g,' '));
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
}
