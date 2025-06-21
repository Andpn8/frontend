import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AnnouncementSummaryComponent } from '../announcement-summary/announcement-summary.component';
import { CommonModule } from '@angular/common';
import { AnnouncementDataService } from '../../services/componentServices/announcement-data.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-announcement-step3',
  templateUrl: './new-announcement-step3.component.html',
  styleUrls: ['./new-announcement-step3.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, AnnouncementSummaryComponent]
})
export class NewAnnouncementStep3Component implements OnInit {
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

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private announcementDataService: AnnouncementDataService,
    private snackBar: MatSnackBar
  ) {
    this.step3Form = this.fb.group({
      descrizione: ['', [Validators.required, Validators.maxLength(3000)]]
    });
  }

  ngOnInit(): void {
    const data = this.announcementDataService.getData();
    
    if (data.descrizione) {
      this.step3Form.get('descrizione')?.setValue(data.descrizione);
    }

    if (data.fotoPreviews) {
      this.fotoPreviews = [...data.fotoPreviews];
    }

    if (data.planimetriaPreviews) {
      this.planimetriaPreviews = [...data.planimetriaPreviews];
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.showFotoMenu && !target.closest('.foto-box') && !target.closest('.menu-popup')) {
      this.showFotoMenu = false;
    }

    if (this.showPlanimetriaMenu && !target.closest('.planimetrie-box') && !target.closest('.menu-popup')) {
      this.showPlanimetriaMenu = false;
    }
  }

  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const newFiles = Array.from(input.files);
      const totalFiles = this.fotoPreviews.length + newFiles.length;

      if (totalFiles > 20) {
        this.snackBar.open("Puoi caricare un massimo di 20 foto.", "Chiudi", {
    duration: 3000
  })
  return;
}

      newFiles.forEach((file: File) => {
        const fileType = file.type;
       if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        this.snackBar.open("Formato non supportato. Carica solo immagini JPEG o PNG.", "Chiudi", {
    duration: 3000
  })
  return;
}

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

  onPlanimetriaSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const newFiles = Array.from(input.files);
      const totalFiles = this.planimetriaPreviews.length + newFiles.length;

      if (totalFiles > 4) {
        this.snackBar.open("Puoi caricare un massimo di 4 planimetrie.", "Chiudi", {
    duration: 3000
  })
  return;
}

      newFiles.forEach((file: File) => {
        const fileType = file.type;
        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
          this.snackBar.open("Formato non supportato. Carica solo immagini JPEG o PNG.", "Chiudi", {
    duration: 3000
  })
  return;
}

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

  onSubmit(): void {
    const fotoValide = this.fotoPreviews.length > 0;
    const planimetrieValide = this.planimetriaPreviews.length > 0;

   if (!fotoValide) {
    this.snackBar.open("Devi caricare almeno una foto.", "Chiudi", {
    duration: 3000
  })
}

    if (!planimetrieValide) {
      this.snackBar.open("Devi caricare almeno una planimetria.", "Chiudi", {
    duration: 3000
  })
}

    if (this.step3Form.valid && fotoValide && planimetrieValide) {
      const step3Data = {
        descrizione: this.step3Form.get('descrizione')?.value,
        fotoPreviews: this.fotoPreviews,
        planimetriaPreviews: this.planimetriaPreviews
      };

      this.announcementDataService.setData(step3Data);
      this.router.navigate(['/new-announcement-step4']);
    } else {
      this.step3Form.markAllAsTouched();
    }
  }

  goBack(): void {
    const step3Data = {
      descrizione: this.step3Form.get('descrizione')?.value,
      fotoPreviews: this.fotoPreviews,
      planimetriaPreviews: this.planimetriaPreviews
    };
    
    this.announcementDataService.setData(step3Data);
    this.router.navigate(['/new-announcement-step2']);
  }
}