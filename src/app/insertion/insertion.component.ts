import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { OffertaVendita, OffertaVenditaService } from '../../services/offerta_vendita.service';
import { OffertaAffitto, OffertaAffittoService } from '../../services/offerta_affitto.service';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { OffertaVisitaAffitto, OffertaVisitaAffittoService } from '../../services/offerta_visita_affitto.service';
import { OffertaVisitaVendita, OffertaVisitaVenditaService } from '../../services/offerta_visita_vendita.service';
import { DecimalPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-insertion',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, MatSnackBarModule],
  providers: [DecimalPipe, OffertaVenditaService, OffertaAffittoService, AuthService, OffertaVisitaVenditaService, OffertaVisitaAffittoService],
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
  minDate: string = '';

  showStreetView: boolean = false;
  streetViewPanorama: any;
  @ViewChild('streetViewElement') streetViewElement!: ElementRef;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private offertaVenditaService: OffertaVenditaService,
    private offertaAffittoService: OffertaAffittoService,
    private authService: AuthService,
    private offertaVisitaVenditaService: OffertaVisitaVenditaService,
    private offertaVisitaAffittoService: OffertaVisitaAffittoService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.annuncio = navigation?.extras?.state?.['annuncio'];
    this.modalitaCatalogo = navigation?.extras?.state?.['modalitaCatalogo'] || 'vendita';

    if (!this.annuncio) {
      this.router.navigate(['/catalog']);
    }
  }

  ngOnInit(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
    
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

      const userId = this.authService.getUserId();
      const token = this.authService.getToken();

      if (!userId || !token) {
        this.snackBar.open("Devi essere loggato per inviare la richiesta di visita.", "Chiudi", {
          duration: 3000
        });
        return;
      }

      let decoded: any;
      try {
        decoded = jwtDecode(token);
      } catch {
        this.snackBar.open("Errore nell'autenticazione, effettua di nuovo il login.", "Chiudi", {
          duration: 3000
        });
        return;
      }

      const emailOfferente = decoded.email;

      if (this.modalitaCatalogo === 'vendita') {
        const offertaVisita: OffertaVisitaVendita = {
          email_offerente: emailOfferente,
          data_visita: this.selectedDate,
          orario: orario,
          inserzione_id: this.annuncio.vendita_id,
          user_id: userId
        };

        this.offertaVisitaVenditaService.creaOffertaVisitaVendita(offertaVisita).subscribe({
          next: () => {
            this.snackBar.open("✅ Richiesta visita vendita inviata con successo!", "Chiudi", {
              duration: 3000
            });
            this.mostraPopupVisita = false;
            this.selectedDate = '';
            this.selectedHour = '';
            this.selectedMinute = '';
          },
          error: (err) => {
            console.error('Errore invio richiesta visita vendita:', err);
            this.snackBar.open("❌ Errore nell'invio della richiesta visita, riprova più tardi.", "Chiudi", {
              duration: 3000
            });
          }
        });

      } else if (this.modalitaCatalogo === 'affitto') {
        const offertaVisita: OffertaVisitaAffitto = {
          email_offerente: emailOfferente,
          data_visita: this.selectedDate,
          orario: orario,
          inserzione_id: this.annuncio.affitto_id,
          user_id: userId
        };

        this.offertaVisitaAffittoService.creaOffertaVisitaAffitto(offertaVisita).subscribe({
          next: () => {
            this.snackBar.open("✅ Richiesta visita affitto inviata con successo!", "Chiudi", {
              duration: 3000
            });
            this.mostraPopupVisita = false;
            this.selectedDate = '';
            this.selectedHour = '';
            this.selectedMinute = '';
          },
          error: (err) => {
            console.error('Errore invio richiesta visita affitto:', err);
            this.snackBar.open("❌ Errore nell'invio della richiesta visita, riprova più tardi.", "Chiudi", {
              duration: 3000
            });
          }
        });

      } else {
        this.snackBar.open("Modalità catalogo non riconosciuta.", "Chiudi", {
          duration: 3000
        });
      }
    } else {
      this.snackBar.open("Per favore compila sia la data che l'orario prima di inviare.", "Chiudi", {
        duration: 3000
      });
    }
  }

  inviaPropostaPrezzo(): void {
    const proposta = parseFloat(this.propostaPrezzo);
    if (!proposta || proposta <= 0 || !this.propostaValida()) {
      this.snackBar.open("Per favore inserisci una proposta valida prima di inviare.", "Chiudi", {
        duration: 3000
      });
      return;
    }

    const userId = this.authService.getUserId();
    const token = this.authService.getToken();

    if (!userId || !token) {
      this.snackBar.open("Devi essere loggato per inviare una proposta.", "Chiudi", {
        duration: 3000
      });
      return;
    }

    let decoded: any;
    try {
      decoded = jwtDecode(token);
    } catch {
      this.snackBar.open("Errore nell'autenticazione, effettua di nuovo il login.", "Chiudi", {
        duration: 3000
      });
      return;
    }

    const emailOfferente = decoded.email;

    if (this.modalitaCatalogo === 'vendita') {
      const offerta: OffertaVendita = {
        email_offerente: emailOfferente,
        offer_amount: proposta,
        inserzione_id: this.annuncio.vendita_id,
        user_id: userId,
      };

      this.offertaVenditaService.creaOffertaVendita(offerta).subscribe({
        next: () => {
          this.snackBar.open("✅ Proposta vendita inviata con successo!", "Chiudi", {
            duration: 3000
          });
          this.mostraPopupPrezzo = false;
          this.propostaPrezzo = '';
        },
        error: (err) => {
          console.error('Errore invio proposta vendita:', err);
          this.snackBar.open("❌ Errore nell'invio della proposta vendita, riprova più tardi.", "Chiudi", {
            duration: 3000
          });
        }
      });

    } else if (this.modalitaCatalogo === 'affitto') {
      const offerta: OffertaAffitto = {
        email_offerente: emailOfferente,
        offer_amount: proposta,
        inserzione_id: this.annuncio.affitto_id,
        user_id: userId,
      };

      this.offertaAffittoService.creaOffertaAffitto(offerta).subscribe({
        next: () => {
          this.snackBar.open("✅ Proposta affitto inviata con successo!", "Chiudi", {
            duration: 3000
          });
          this.mostraPopupPrezzo = false;
          this.propostaPrezzo = '';
        },
        error: (err) => {
          console.error('Errore invio proposta affitto:', err);
          this.snackBar.open("❌ Errore nell'invio della proposta affitto, riprova più tardi.", "Chiudi", {
            duration: 3000
          });
        }
      });

    } else {
      this.snackBar.open("Modalità catalogo non riconosciuta.", "Chiudi", {
        duration: 3000
      });
    }
  }

  calcolaDifferenzaPercentuale(): number {
    const prezzoBase = this.modalitaCatalogo === 'affitto'
      ? this.annuncio.prezzo_mensile
      : this.annuncio.prezzo;

    const proposta = parseFloat(this.propostaPrezzo);
    if (!prezzoBase || !proposta || proposta <= 0) return 0;

    const diff = ((proposta - prezzoBase) / prezzoBase) * 100;
    return Math.round(diff);
  }

  formatDifferenzaPercentuale(): string {
    const diff = this.calcolaDifferenzaPercentuale();
    return diff > 0 ? `+${diff}%` : `${diff}%`;
  }

  getColoreDifferenza(): string {
    const diff = this.calcolaDifferenzaPercentuale();
    return diff >= -15 && diff <= 15 ? '#087e8b' : '#ce2d4f';
  }

  propostaValida(): boolean {
    const proposta = parseFloat(this.propostaPrezzo);
    const diff = this.calcolaDifferenzaPercentuale();
    return !!proposta && diff >= -15 && diff <= 15;
  }

  validateHour(): void {
    const hour = parseInt(this.selectedHour || '0', 10);
    if (hour > 23) this.selectedHour = '23';
    if (hour < 0) this.selectedHour = '0';
  }

  validateMinute(): void {
    const minute = parseInt(this.selectedMinute || '0', 10);
    if (minute > 59) this.selectedMinute = '59';
    if (minute < 0) this.selectedMinute = '0';
  }

  onHourInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2);

    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      if (num > 23) {
        value = '23';
      }
      this.selectedHour = value;
      event.target.value = value;
    } else {
      this.selectedHour = '';
    }
  }

  onMinuteInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2);

    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      if (num > 59) {
        value = '59';
      }
      this.selectedMinute = value;
      event.target.value = value;
    } else {
      this.selectedMinute = '';
    }
  }

  preventManualInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  toggleStreetView(): void {
    this.showStreetView = !this.showStreetView;

    if (this.showStreetView) {
      setTimeout(() => {
        this.initializeStreetView();
      }, 0);
    } else if (this.streetViewPanorama) {
      this.streetViewPanorama = null;
    }
  }

  initializeStreetView(): void {
    if (!window.google || !window.google.maps) {
      this.snackBar.open("Google Maps API non è disponibile. Si prega di ricaricare la pagina.", "Chiudi", {
        duration: 3000
      });
      this.showStreetView = false;
      return;
    }

    const fullAddress = `${this.annuncio.indirizzo} ${this.annuncio.civico}, ${this.annuncio.cap} ${this.annuncio.comune}, Italia`;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: fullAddress }, (results: any[], status: string) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;

        this.streetViewPanorama = new window.google.maps.StreetViewPanorama(
          this.streetViewElement.nativeElement,
          {
            position: location,
            pov: { heading: 34, pitch: 10 },
            zoom: 1,
            addressControl: false,
            linksControl: true,
            panControl: true,
            enableCloseButton: false
          }
        );
      } else {
        this.snackBar.open("Non è stato possibile trovare la posizione su Street View.", "Chiudi", {
          duration: 3000
        });
        this.showStreetView = false;
      }
    });
  }

  isRegularUser(): boolean {
    return this.authService.getUserRoleFromToken() === 'user';
  }
}