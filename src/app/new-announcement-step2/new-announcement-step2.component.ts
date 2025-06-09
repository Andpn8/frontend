import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../services/announcement-data.service';

@Component({
  selector: 'app-new-announcement-step2',
  templateUrl: './new-announcement-step2.component.html',
  styleUrls: ['./new-announcement-step2.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    AnnouncementSummaryComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class NewAnnouncementStep2Component {
  step2Form: FormGroup;

  classiEnergetiche = ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

  stanze = [
    { label: 'Bagno', placeholder: 'Nessun Bagno', icon: 'https://i.imgur.com/JIFqabC.png', control: 'bagno' },
    { label: 'Cucina', placeholder: 'Nessuna Cucina', icon: 'https://i.imgur.com/86gT04H.png', control: 'cucina' },
    { label: 'Camera da Letto', placeholder: 'Nessuna Camera da Letto', icon: 'https://i.imgur.com/K2MwtmB.png', control: 'cameradaletto' },
    { label: 'Locale', placeholder: 'Nessun Locale', icon: 'https://i.imgur.com/gzOq3Aq.png', control: 'locale' },  
  ];


  servizi = [
    { label: 'Portineria', control: 'portineria', icon: 'https://i.imgur.com/VJaYioG.png' },
    { label: 'Garage', control: 'garage', icon: 'https://i.imgur.com/ueH8rrr.png' },
    { label: 'Climatizzazione', control: 'climatizzazione', icon: 'https://i.imgur.com/XmMODSN.png' },
    { label: 'Sicurezza', control: 'sicurezza', icon: 'https://i.imgur.com/W5YhXAT.png' },
    { label: 'Ascensore', control: 'ascensore', icon: 'https://i.imgur.com/N0uJ0bl.png' },
    { label: 'Accesso Disabili', control: 'accessoDisabili', icon: 'https://i.imgur.com/TvLi7nb.png' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private announcementDataService: AnnouncementDataService
  ) {
    // 1. Crea il form
    this.step2Form = this.fb.group({
      superficie: ['', Validators.required],
      piano: ['', Validators.required],
      classeEnergetica: [''],
      portineria: [false],
      garage: [false],
      climatizzazione: [false],
      sicurezza: [false],
      ascensore: [false],
      accessoDisabili: [false],
      bagno: [''],
      cucina: [''],
      cameradaletto: [''],
      locale: ['']
    });

    // 2. Pre-popola il form con i dati salvati
    const data = this.announcementDataService.getData();
    this.step2Form.patchValue({
      superficie: data.superficie || '',
      piano: data.piano || '',
      classeEnergetica: data.classeEnergetica || '',
      portineria: data.portineria || false,
      garage: data.garage || false,
      climatizzazione: data.climatizzazione || false,
      sicurezza: data.sicurezza || false,
      ascensore: data.ascensore || false,
      accessoDisabili: data.accessoDisabili || false,
      bagno: data.bagno || '',
      cucina: data.cucina || '',
      cameradaletto: data.cameradaletto || '',
      locale: data.locale || ''
    });


    // 3. Aggiorna il servizio in tempo reale quando i campi cambiano
    this.step2Form.valueChanges.subscribe((formValues) => {
      this.announcementDataService.setData(formValues);
    });
  }

  isInvalid(field: string): boolean {
    const control = this.step2Form.get(field);
    return control ? control.invalid && control.touched : false;
  }

  goBack(): void {
    this.router.navigate(['/new-announcement']);
  }

  onSubmit(): void {
    if (this.step2Form.valid) {
      this.announcementDataService.setData(this.step2Form.value);
      this.router.navigate(['/new-announcement-step3']);
    } else {
      this.step2Form.markAllAsTouched();
    }
  }
}
