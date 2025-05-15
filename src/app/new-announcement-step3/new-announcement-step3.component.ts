import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AnnouncementSummaryComponent } from '../announcement-summary/announcement-summary.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-new-announcement-step3',
  templateUrl: './new-announcement-step3.component.html',
  styleUrls: ['./new-announcement-step3.component.scss'],
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, NavbarComponent, AnnouncementSummaryComponent]
})
export class NewAnnouncementStep3Component {
  activeStep = 3;
  step3Form: FormGroup;

  fotoPreviews: string[] = [];
  planimetriaPreviews: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.step3Form = this.fb.group({
      descrizione: ['', Validators.required]
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

  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (const file of Array.from(input.files)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fotoPreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onPlanimetriaSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (const file of Array.from(input.files)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.planimetriaPreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFoto(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.fotoPreviews.splice(index, 1);
  }

  removePlanimetria(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.planimetriaPreviews.splice(index, 1);
  }
}
