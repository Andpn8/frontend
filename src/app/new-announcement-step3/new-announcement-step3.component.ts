import { Component, HostListener } from '@angular/core';
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
  standalone: true,
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, NavbarComponent, AnnouncementSummaryComponent]
})
export class NewAnnouncementStep3Component {
  activeStep = 3;
  step3Form: FormGroup;

  fotoPreviews: string[] = [];
  planimetriaPreviews: string[] = [];

  showFotoOverlay = false;
  showFotoMenu = false;
  showDeleteIcons = false;
  hovered = false;

  showPlanimetriaOverlay = false;
  showPlanimetriaMenu = false;
  showPlanimetriaDeleteIcons = false;

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
    this.showFotoMenu = false;
    this.showDeleteIcons = false;
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
    this.showPlanimetriaMenu = false;
    this.showPlanimetriaDeleteIcons = false;
  }

  removeFoto(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.fotoPreviews.splice(index, 1);
    if (this.fotoPreviews.length === 0) {
      this.disableDeleteMode();
    }
  }

  removePlanimetria(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.planimetriaPreviews.splice(index, 1);
    if (this.planimetriaPreviews.length === 0) {
      this.disablePlanimetriaDeleteMode();
    }
  }

  toggleFotoMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.showDeleteIcons) {
      this.showFotoMenu = !this.showFotoMenu;
    }
  }

  togglePlanimetriaMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.showPlanimetriaDeleteIcons) {
      this.showPlanimetriaMenu = !this.showPlanimetriaMenu;
    }
  }

  enableDeleteMode(): void {
    this.showDeleteIcons = true;
    this.showFotoMenu = false;
    this.showFotoOverlay = false;
    this.hovered = false;
  }

  enablePlanimetriaDeleteMode(): void {
    this.showPlanimetriaDeleteIcons = true;
    this.showPlanimetriaMenu = false;
    this.showPlanimetriaOverlay = false;
  }

  disableDeleteMode(): void {
    this.showDeleteIcons = false;
    this.showFotoOverlay = false;
    this.hovered = false;
  }

  disablePlanimetriaDeleteMode(): void {
    this.showPlanimetriaDeleteIcons = false;
    this.showPlanimetriaOverlay = false;
  }

  triggerFileInput(fotoInput: HTMLInputElement): void {
    fotoInput.click();
    this.showFotoMenu = false;
  }

  triggerPlanimetriaInput(input: HTMLInputElement): void {
    input.click();
    this.showPlanimetriaMenu = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.showFotoMenu = false;
    this.showDeleteIcons = false;
    this.showFotoOverlay = false;
    this.hovered = false;

    this.showPlanimetriaMenu = false;
    this.showPlanimetriaDeleteIcons = false;
    this.showPlanimetriaOverlay = false;
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  onMouseEnter(): void {
    if (this.fotoPreviews.length > 0 && !this.showDeleteIcons) {
      this.hovered = true;
      this.showFotoOverlay = true;
    }
  }

  onMouseLeave(): void {
    this.hovered = false;
    this.showFotoOverlay = false;
  }

  onPlanimetriaMouseEnter(): void {
    if (this.planimetriaPreviews.length > 0 && !this.showPlanimetriaDeleteIcons) {
      this.showPlanimetriaOverlay = true;
    }
  }

  onPlanimetriaMouseLeave(): void {
    this.showPlanimetriaOverlay = false;
  }
}
