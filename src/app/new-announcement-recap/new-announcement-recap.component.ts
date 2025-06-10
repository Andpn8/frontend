import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../../services/componentServices/announcement-data.service';
import { AuthService } from '../../services/auth.service';
import { InsertionService } from '../../services/insertion.service';

@Component({
  selector: 'app-new-announcement-recap',
  standalone: true,
  templateUrl: './new-announcement-recap.component.html',
  styleUrls: ['./new-announcement-recap.component.scss'],
  imports: [NavbarComponent, AnnouncementSummaryComponent, CommonModule],
  providers: [InsertionService],
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
  hasCellulare: boolean = false;
  showConfirmationModal = false;

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

  constructor(
    private router: Router,
    private announcementDataService: AnnouncementDataService,
    private authService: AuthService,
    private insertionService: InsertionService
  ) {} 

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.headerWidth = this.headerContent.nativeElement.offsetWidth;
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
      this.hasCellulare = !!data.showPhone;
      this.cellulare = data.phone || '';
      
      this.serviziAttivi = this.servizi
        .filter(servizio => data[servizio.control])
        .map(servizio => servizio.label);

      this.images = data.fotoPreviews || [];
      this.planimetrie = data.planimetriaPreviews || [];
      
      if (this.images.length > 0) {
        this.selectedImage = this.images[0];
      }
      if (this.planimetrie.length > 0) {
        this.selectedPlanimetria = this.planimetrie[0];
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/new-announcement-step4']); 
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

  openConfirmationModal(): void {
    this.showConfirmationModal = true;
  }

  cancelConfirmation(): void {
    this.showConfirmationModal = false;
  }

  confirmSubmission(): void {
  const data = this.announcementDataService.getData();
  const agentId = this.authService.getAgentId();

  if (!data || !agentId) {
    console.error('Dati annuncio o agentId mancanti');
    return;
  }

  if (!data.titolo || !data.indirizzo || !data.citta || !data.prezzo) {
    console.error('Campi obbligatori mancanti');
    return;
  }

  const insertionData = {
    ...data,
    propertyType: data.immobile || 'Appartamento', 
    agent_id: agentId,
    servizi: {
      portineria: data.portineria || false,
      sicurezza: data.sicurezza || false,
      garage: data.garage || false,
      ascensore: data.ascensore || false,
      climatizzazione: data.climatizzazione || false,
      accesso_disabili: data.accessoDisabili || false
    },
    cellulare_mostrato: data.showPhone || false,
    cellulare_agente: data.phone || '',
    email_agente: data.email || '',
    descrizione: data.descrizione || 'Nessuna descrizione',
  };

  if (data?.announcementType === 'affitto') {
    this.insertionService.createRent(insertionData).subscribe({
      next: (response) => {
        console.log('Annuncio affitto creato con successo', response);
        this.router.navigate(['/announcement-confirmation']);
      },
      error: (error) => {
        console.error('Errore nella creazione annuncio affitto', error);
      }
    });
  } else if (data?.announcementType === 'vendita') {
    this.insertionService.createSale(insertionData).subscribe({
      next: (response) => {
        console.log('Annuncio vendita creato con successo', response);
        this.router.navigate(['/announcement-confirmation']);
      },
      error: (error) => {
        console.error('Errore nella creazione annuncio vendita', error);
      }
    });
  }

  this.showConfirmationModal = false;
}
}
