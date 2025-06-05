import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../services/announcement-data.service';

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    AnnouncementSummaryComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class NewAnnouncementComponent implements OnInit {
  announcementType: 'vendita' | 'affitto' = 'vendita';
  form: FormGroup;
  announcementData: any = {};  // Aggiungi una variabile per memorizzare i dati

  constructor(private fb: FormBuilder, private router: Router, private announcementDataService: AnnouncementDataService) {
    this.form = this.fb.group({
      immobile: ['', Validators.required],
      titolo: ['', Validators.required],
      prezzo: ['', Validators.required],
      comune: ['', Validators.required],
      indirizzo: ['', Validators.required],
      numero: ['', Validators.required],
      cap: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const savedData = this.announcementDataService.getData();
    if (savedData) {
      this.form.patchValue(savedData);
    } 

    if (savedData.announcementType) {
      this.announcementType = savedData.announcementType;
    }

   // Ascolta le modifiche per aggiornare localmente i dati
    this.form.valueChanges.subscribe(() => {
      this.updateAnnouncementData();
    });

    this.updateAnnouncementData();
  }

  setAnnouncementType(type: 'vendita' | 'affitto') {
    this.announcementType = type;
    this.announcementDataService.setData({ announcementType: type });
  }

  // Funzione per aggiornare i dati quando il form cambia
  updateAnnouncementData() {
    this.announcementData = {
      immobile: this.form.get('immobile')?.value,
      titolo: this.form.get('titolo')?.value,
      prezzo: this.form.get('prezzo')?.value,
      comune: this.form.get('comune')?.value,
      indirizzo: this.form.get('indirizzo')?.value,
      numero: this.form.get('numero')?.value,
      cap: this.form.get('cap')?.value
    };
  }

  proceed() {
    if (this.form.valid) {
      // Salva i dati nel servizio
      this.announcementDataService.setData(this.form.value);
      this.router.navigate(['/new-announcement-step2']);
    } else {
      // Se il form non è valido, fai vedere i campi richiesti
      this.form.markAllAsTouched();
    }
  }
}
