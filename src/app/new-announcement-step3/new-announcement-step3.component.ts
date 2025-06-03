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
  tempFotoPreviews: string[] = [];
  selectedFotoToDelete: boolean[] = [];
  isFotoDeletionModalVisible = false;

  planimetriaPreviews: string[] = [];
  tempPlanimetriaPreviews: string[] = [];
  selectedPlanimetriaToDelete: boolean[] = []; 
  isPlanimetriaDeletionModalVisible = false;

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

  // FOTO - Caricamento
  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      Array.from(input.files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fotoPreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeFoto(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.fotoPreviews.splice(index, 1);
    if (this.fotoPreviews.length === 0) {
      this.disableDeleteMode();
    }
  }

  toggleFotoMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showFotoMenu = !this.showFotoMenu;
  }

  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }

  // FOTO - Modale eliminazione
  openPhotoDeletionPanel(): void {
    this.tempFotoPreviews = [...this.fotoPreviews];
    this.selectedFotoToDelete = this.tempFotoPreviews.map(() => false);
    this.isFotoDeletionModalVisible = true;
    this.showFotoMenu = false;
  }

  closeFotoDeletionPanel(): void {
    this.isFotoDeletionModalVisible = false;
  }

  toggleFotoSelection(index: number): void {
    this.selectedFotoToDelete[index] = !this.selectedFotoToDelete[index];
  }

  confirmFotoDeletion(): void {
    this.fotoPreviews = this.tempFotoPreviews.filter((_, i) => !this.selectedFotoToDelete[i]);
    this.isFotoDeletionModalVisible = false;
    if (this.fotoPreviews.length === 0) {
      this.disableDeleteMode();
    }
  }

  disableDeleteMode(): void {
    this.showDeleteIcons = false;
  }

  onMouseEnter(): void {
    this.showFotoOverlay = true;
  }

  onMouseLeave(): void {
    this.showFotoOverlay = false;
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  // PLANIMETRIE - Caricamento
  onPlanimetriaSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      Array.from(input.files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.planimetriaPreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removePlanimetria(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.planimetriaPreviews.splice(index, 1);
    if (this.planimetriaPreviews.length === 0) {
      this.disablePlanimetriaDeleteMode();
    }
  }

  togglePlanimetriaMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showPlanimetriaMenu = !this.showPlanimetriaMenu;
  }

  triggerPlanimetriaInput(input: HTMLInputElement): void {
    input.click();
  }

  // PLANIMETRIE - Modale eliminazione
  openPlanimetriaDeletionPanel(): void {
    this.tempPlanimetriaPreviews = [...this.planimetriaPreviews];
    this.selectedPlanimetriaToDelete = this.tempPlanimetriaPreviews.map(() => false); 
    this.isPlanimetriaDeletionModalVisible = true;
    this.showPlanimetriaMenu = false;
  }

  closePlanimetriaDeletionPanel(): void {
    this.isPlanimetriaDeletionModalVisible = false;
  }

  togglePlanimetriaSelection(index: number): void {
    this.selectedPlanimetriaToDelete[index] = !this.selectedPlanimetriaToDelete[index]; 
  }

  confirmPlanimetriaDeletion(): void {
    this.planimetriaPreviews = this.tempPlanimetriaPreviews.filter((_, i) => !this.selectedPlanimetriaToDelete[i]); 
    this.isPlanimetriaDeletionModalVisible = false;
    if (this.planimetriaPreviews.length === 0) {
      this.disablePlanimetriaDeleteMode();
    }
  }

  disablePlanimetriaDeleteMode(): void {
    this.showPlanimetriaDeleteIcons = false;
  }

  onPlanimetriaMouseEnter(): void {
    this.showPlanimetriaOverlay = true;
  }

  onPlanimetriaMouseLeave(): void {
    this.showPlanimetriaOverlay = false;
  }

  // Navigazione
  onSubmit(): void {
    if (this.step3Form.valid) {
      this.router.navigate(['/new-announcement-step4']);
    } else {
      this.step3Form.markAllAsTouched();
    }
  }

  goBack(): void {
    this.router.navigate(['/new-announcement-step2']);
  }
}
