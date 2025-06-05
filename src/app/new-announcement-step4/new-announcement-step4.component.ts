import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../services/announcement-data.service';

@Component({
  selector: 'app-new-announcement-step4',
  templateUrl: './new-announcement-step4.component.html',
  styleUrls: ['./new-announcement-step4.component.scss'],
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, NavbarComponent, AnnouncementSummaryComponent]
})
export class NewAnnouncementStep4Component {
  step4Form: FormGroup;
  activeStep = 4;

  prefixOptions = [
    { code: '+39', label: '🇮🇹 +39' },
    { code: '+33', label: '🇫🇷 +33' },
    { code: '+49', label: '🇩🇪 +49' },
    // Aggiungi altri se necessario
  ];

  constructor(private fb: FormBuilder, private router: Router, private announcementDataService: AnnouncementDataService) {
    this.step4Form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com|it|net|org|edu|gov|info|biz|io|co)$')]],
    prefix: ['+39', Validators.required],
    phone: [
     '', 
    [
      Validators.required, 
      Validators.pattern('^[0-9]+$'), // Solo numeri
      Validators.minLength(10),        // Lunghezza minima 10
      Validators.maxLength(15)         // Lunghezza massima 15
    ]
  ],
  showPhone: [true]
    });
  }

  get isFormValid(): boolean {
   return this.step4Form.valid;
  }

  filterNumericInput(event: Event): void {
   const input = event.target as HTMLInputElement;
   input.value = input.value.replace(/\D/g, '');
    this.step4Form.get('phone')?.setValue(input.value);
    this.step4Form.get('phone')?.updateValueAndValidity();
  }

  goBack(): void {
    this.router.navigate(['/new-announcement-step3']);
  }

 proceed(): void {
    if (this.step4Form.valid) {
      this.announcementDataService.setData(this.step4Form.value)
      this.router.navigate(['/new-announcement-recap']);
    } else {
      this.step4Form.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.step4Form.get(controlName);
    return control?.invalid && control?.touched || false;
  }
}
