import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../../services/componentServices/announcement-data.service';
import { AuthService } from '../../services/auth.service';
import { InsertionService } from '../../services/insertion.service';
import { forkJoin } from 'rxjs';

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
  isAffitto: boolean = false;
  showResultModal = false;
  resultModalTitle = '';
  resultModalMessage = '';

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
      this.isAffitto = data.announcementType === 'affitto';
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

  async confirmSubmission(): Promise<void> {
  const data = this.announcementDataService.getData();
  const agentId = this.authService.getAgentId();

  if (!data || !agentId) {
    this.showError('Dati annuncio o agentId mancanti');
    return;
  }

  if (!data.titolo || !data.indirizzo || !data.citta || !data.prezzo) {
    this.showError('Campi obbligatori mancanti');
    return;
  }

  try {
    const fotoFiles = data.fotoPreviews?.map((preview: string) => this.dataURLtoFile(preview)) || [];
    const planimetrieFiles = data.planimetriaPreviews?.map((preview: string) => this.dataURLtoFile(preview)) || [];

    const uploadResults = await forkJoin([
      this.insertionService.uploadFiles(fotoFiles),
      this.insertionService.uploadFiles(planimetrieFiles)
    ]).toPromise();

    if (!uploadResults) {
      throw new Error('Upload failed');
    }

    const [fotoUrls = [], planimetrieUrls = []] = uploadResults;

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
      await this.insertionService.createRent(insertionData, fotoUrls, planimetrieUrls).toPromise();
      this.showSuccessAndRedirect('Annuncio affitto creato con successo');
    } else if (data?.announcementType === 'vendita') {
      await this.insertionService.createSale(insertionData, fotoUrls, planimetrieUrls).toPromise();
      this.showSuccessAndRedirect('Annuncio vendita creato con successo');
    }
  } catch (error) {
    console.error('Errore durante il caricamento:', error);
    this.showError('Errore durante il caricamento dell\'annuncio');
  } finally {
    this.showConfirmationModal = false;
  }
}

private dataURLtoFile(dataurl: string): File {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  
  if (!mimeMatch) {
    throw new Error('Invalid data URL format');
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  
  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  
  return new File([u8arr], 'image.jpg', { type: mime });
}

private showSuccess(message: string): void {
  this.resultModalTitle = 'Operazione completata';
  this.resultModalMessage = message;
  this.showResultModal = true;
}

private showError(message: string): void {
  this.resultModalTitle = 'Errore';
  this.resultModalMessage = message;
  this.showResultModal = true;
}

closeResultModal(): void {
  this.showResultModal = false;
  this.resultModalTitle = '';
  this.resultModalMessage = '';
}

private showSuccessAndRedirect(message: string): void {
  this.resultModalTitle = 'Operazione completata';
  this.resultModalMessage = message;
  this.showResultModal = true;
  
  setTimeout(() => {
    this.router.navigate(['/home']);
  }, 3000);
}
}
