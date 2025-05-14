import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AnnouncementSummaryComponent } from '../announcement-summary/announcement-summary.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { AboutUsComponent } from "../about-us/about-us.component";

@Component({
  selector: 'app-new-announcement-step3',
  standalone: true,
  templateUrl: './new-announcement-step3.component.html',
  styleUrls: ['./new-announcement-step3.component.scss'],
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, NavbarComponent, AnnouncementSummaryComponent, AboutUsComponent]
})
export class NewAnnouncementStep3Component {
  activeStep = 3;

  step3Form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.step3Form = this.fb.group({
      descrizione: ['', Validators.required],
      foto: [null] // opzionale per ora
    });
  }

  goBack(): void {
    this.router.navigate(['/new-announcement-step2']);
  }

onSubmit(): void {
    if (this.step3Form.valid) {
      this.router.navigate(['/new-announcement-step4']);
    } else {
      this.step3Form.markAllAsTouched();
    }
  }
}
