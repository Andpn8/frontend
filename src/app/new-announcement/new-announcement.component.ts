import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../../services/componentServices/announcement-data.service';
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
export class NewAnnouncementComponent implements OnInit, AfterViewInit {
  announcementType: 'vendita' | 'affitto' = 'vendita';
  form: FormGroup;
  announcementData: any = {};

  showMapModal = false;
  map: any;
  marker: any;
  geocoder: any;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private announcementDataService: AnnouncementDataService,
    private ngZone: NgZone
  ) {
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

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initializeGoogleAutocomplete();
    }
  }

  ngAfterViewInit(): void {
  }

  initializeGoogleAutocomplete() {
    const cityInput = document.getElementById("autocomplete-citta") as HTMLInputElement;

    if (cityInput) {
      const cityAutocomplete = new google.maps.places.Autocomplete(cityInput, {
        types: ['(cities)'],
        componentRestrictions: { country: 'it' }
      });

      cityAutocomplete.addListener('place_changed', () => {
        const place = cityAutocomplete.getPlace();
        const cityName = place.name;
        this.ngZone.run(() => {
          this.form.get('citta')?.setValue(cityName);
        });
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

        this.ngZone.run(() => {
          this.form.get('indirizzo')?.setValue(street);
          this.form.get('numero')?.setValue(streetNumber);
          this.form.get('cap')?.setValue(postalCode);

          if (city) {
            this.form.get('citta')?.setValue(city);
          }
        });
      });
    }
  }

  openMap() {
  this.showMapModal = true;
  
  setTimeout(() => {
    if (!this.map) {
      this.initMap();
    } else {
      this.map = null;
      this.initMap();
      
      if (this.marker) {
        const position = this.marker.getPosition();
        this.marker = new google.maps.Marker({
          position: position,
          map: this.map,
          draggable: true
        });
      }
    }
  }, 0);
}

  closeMap() {
  this.showMapModal = false;
  
  if (this.map) {
    this.map.unbindAll();
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = '';
    }
  }
}

  initMap() {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapElement.innerHTML = '';
  }

  const italyLatLng = new google.maps.LatLng(41.8719, 12.5674);

  this.map = new google.maps.Map(mapElement, {
    center: italyLatLng,
    zoom: 6,
    gestureHandling: 'greedy'
  });

  this.geocoder = new google.maps.Geocoder();

  this.map.addListener('click', (event: any) => {
    this.placeMarkerAndGeocode(event.latLng);
  });
}

  placeMarkerAndGeocode(latLng: any) {
    if (this.marker) {
      this.marker.setPosition(latLng);
    } else {
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        draggable: true
      });

      // Aggiungo evento dragend per aggiornare i dati
      this.marker.addListener('dragend', (e: any) => {
        this.placeMarkerAndGeocode(e.latLng);
      });
    }

    this.geocoder.geocode({ location: latLng }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const addressComponents = results[0].address_components;

        // Estraggo i dati rilevanti
        const street = this.getComponent(addressComponents, 'route');
        const streetNumber = this.getComponent(addressComponents, 'street_number');
        const postalCode = this.getComponent(addressComponents, 'postal_code');
        let city = this.getComponent(addressComponents, 'locality');
        if (!city) {
          city = this.getComponent(addressComponents, 'administrative_area_level_3');
        }

        // Andrea, qui è importante: aggiorniamo il form in Angular zone
        this.ngZone.run(() => {
          if (street) this.form.get('indirizzo')?.setValue(street);
          if (streetNumber) this.form.get('numero')?.setValue(streetNumber);
          if (postalCode) this.form.get('cap')?.setValue(postalCode);
          if (city) this.form.get('citta')?.setValue(city);
        });
      }
    });
  }

  getComponent(components: any[], type: string): string | null {
    const comp = components.find(c => c.types.includes(type));
    return comp ? comp.long_name : null;
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
      cap: this.form.get('cap')?.value,
      announcementType: this.announcementType
    };

    this.announcementDataService.setData(this.announcementData);
  }

  proceed() {
    if (this.form.valid) {
      this.updateAnnouncementData();
      this.router.navigate(['/next-step']);
    }
  }
}
