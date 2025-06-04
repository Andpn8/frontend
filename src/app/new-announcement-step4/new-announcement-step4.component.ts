import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.step4Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      prefix: ['+39', Validators.required],
      phone: ['', Validators.required],
      showPhone: [true]
    });
  }

  goBack(): void {
    this.router.navigate(['/new-announcement-step3']);
  }

 proceed(): void {
    if (this.step4Form.valid) {
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
