import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';

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
export class NewAnnouncementComponent {
  announcementType: 'vendita' | 'affitto' = 'vendita';
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

  setAnnouncementType(type: 'vendita' | 'affitto') {
    this.announcementType = type;
  }

  proceed() {
    if (this.form.valid) {
      // Quando il form è valido, naviga a new-announcement-step2
      this.router.navigate(['/new-announcement-step2']);
    } else {
      // Se il form non è valido, fai vedere i campi richiesti
      this.form.markAllAsTouched();
    }
  }
}









