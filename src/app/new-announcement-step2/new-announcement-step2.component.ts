import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../../services/componentServices/announcement-data.service';

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
    this.step2Form = this.fb.group({
      superficie: ['', Validators.required],
      piano: ['', Validators.required],
      classeEnergetica: ['', Validators.required],
      portineria: [false],
      garage: [false],
      climatizzazione: [false],
      sicurezza: [false],
      ascensore: [false],
      accessoDisabili: [false],
      locali: ['', Validators.required],  
      bagni: ['', Validators.required]   
    });

    Object.keys(this.step2Form.controls).forEach(field => {
      const control = this.step2Form.get(field);
       if (control && control.validator) {
        control.markAsTouched({ onlySelf: true });
       }
    });

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
      locali: data.locali || '',
      bagni: data.bagni || ''
    });

    this.step2Form.valueChanges.subscribe(formValues => {
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
