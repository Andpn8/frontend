import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../services/announcement-data.service';
declare const google: any;

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    AnnouncementSummaryComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class NewAnnouncementComponent implements OnInit {
  announcementType: 'vendita' | 'affitto' = 'vendita';
  form: FormGroup;
  announcementData: any = {}; 

  constructor(private fb: FormBuilder, private router: Router, private announcementDataService: AnnouncementDataService) {
    this.form = this.fb.group({
      immobile: ['', Validators.required],
      titolo: ['', Validators.required],
      prezzo: ['', Validators.required],
      citta: ['', Validators.required],
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

  if (savedData?.announcementType) {
    this.announcementType = savedData.announcementType;
  }

  this.form.valueChanges.subscribe(() => {
    this.updateAnnouncementData();
  });

  this.updateAnnouncementData();

  const cityInput = document.getElementById("autocomplete-citta") as HTMLInputElement;

  if (cityInput) {
    const cityAutocomplete = new google.maps.places.Autocomplete(cityInput, {
      types: ['(cities)'],
      componentRestrictions: { country: 'it' }
    });

    cityAutocomplete.addListener('place_changed', () => {
      const place = cityAutocomplete.getPlace();
      const cityName = place.name;
      this.form.get('citta')?.setValue(cityName);
    });
  }

  const addressInput = document.getElementById("autocomplete-indirizzo") as HTMLInputElement;

  if (addressInput) {
    const addressAutocomplete = new google.maps.places.Autocomplete(addressInput, {
      types: ['address'],
      componentRestrictions: { country: 'it' }
    });

    addressAutocomplete.addListener('place_changed', () => {
      const place = addressAutocomplete.getPlace();

      let street = '';
      let streetNumber = '';
      let postalCode = '';
      let city = '';

      if (place.address_components) {
        for (const component of place.address_components) {
          const types = component.types;

          if (types.includes('route')) {
            street = component.long_name;
          }
          if (types.includes('street_number')) {
            streetNumber = component.long_name;
          }
          if (types.includes('postal_code')) {
            postalCode = component.long_name;
          }
          if (types.includes('locality')) {
            city = component.long_name;
          } else if (types.includes('administrative_area_level_3') && !city) {
            city = component.long_name;
          }
        }
      }

      this.form.get('indirizzo')?.setValue(street);
      this.form.get('numero')?.setValue(streetNumber);
      this.form.get('cap')?.setValue(postalCode);

      if (city) {
        this.form.get('citta')?.setValue(city);
      }
    });
  }
}


  setAnnouncementType(type: 'vendita' | 'affitto') {
    this.announcementType = type;
    this.announcementDataService.setData({ announcementType: type });
  }

  updateAnnouncementData() {
  this.announcementData = {
    immobile: this.form.get('immobile')?.value,
    titolo: this.form.get('titolo')?.value,
    prezzo: this.form.get('prezzo')?.value,
    citta: this.form.get('citta')?.value,
    indirizzo: this.form.get('indirizzo')?.value,
    numero: this.form.get('numero')?.value,
    cap: this.form.get('cap')?.value
  };
}
  

  proceed() {
    if (this.form.valid) {
      this.announcementDataService.setData(this.form.value);
      this.router.navigate(['/new-announcement-step2']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
