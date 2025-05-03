import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule per usare ngStyle

@Component({
  selector: 'announcement-summary',
  templateUrl: './announcement-summary.component.html',
  styleUrls: ['./announcement-summary.component.scss'],
  standalone: true,  // Indica che il componente è standalone
  imports: [CommonModule]  // Importa CommonModule per usare ngStyle, ngClass, ecc.
})
export class AnnouncementSummaryComponent {
  currentStep: number = 1; // Imposta il passo corrente
  formValid: boolean = false; // Controlla la validità del form

  // Array per tenere traccia degli step completati
  completedSteps: boolean[] = [false, false, false, false];

  // Metodo per aggiornare lo stato di un campo obbligatorio (da usare per il controllo del form)
  updateFormStatus(valid: boolean) {
    this.formValid = valid;
  }

  // Metodo per navigare tra i vari step
  goToStep(step: number) {
    if (this.completedSteps[step - 1]) {
      this.currentStep = step;
    }
  }

  // Verifica se un passo è completato
  isStepCompleted(step: number): boolean {
    return this.completedSteps[step - 1];
  }

  // Metodo per segnare un passo come completato
  markStepAsCompleted(step: number) {
    this.completedSteps[step - 1] = true;
  }
}


