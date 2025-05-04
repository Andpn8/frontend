import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Router e ActivatedRoute per la gestione della navigazione
import { CommonModule } from '@angular/common';

@Component({
  selector: 'announcement-summary',
  templateUrl: './announcement-summary.component.html',
  styleUrls: ['./announcement-summary.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AnnouncementSummaryComponent implements OnInit {
  currentStep: number = 1; // Imposta il passo corrente
  formValid: boolean = false; // Stato di validità del form
  completedSteps: boolean[] = [false, false, false, false]; // Stato degli step completati

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // All'inizio, settiamo il currentStep in base all'URL
    this.route.url.subscribe(url => {
      this.updateCurrentStepFromURL(url); // Cambia currentStep quando la rotta cambia
    });
  }

  // Metodo per aggiornare lo stato del form
  updateFormStatus(valid: boolean) {
    this.formValid = valid;
  }

  // Metodo per navigare agli step specifici
  goToStep(step: number) {
    this.currentStep = step;
    this.updateStepCompletion(step); // Segna lo step come completato

    // Naviga alla rotta corrispondente
    if (step === 1) {
      this.router.navigate(['/new-announcement']);
    } else if (step === 2) {
      this.router.navigate(['/new-announcement-step2']);
    } else if (step === 3) {
      this.router.navigate(['/new-announcement-step3']);
    } else if (step === 4) {
      this.router.navigate(['/new-announcement-step4']);
    }
  }

  // Metodo per il bottone "Prosegui"
  goToNextStep() {
    if (this.currentStep < 4) {
      this.currentStep++; // Incrementa il passo corrente
      this.goToStep(this.currentStep); // Naviga al prossimo step
    }
  }

  // Verifica se uno step è stato completato
  isStepCompleted(step: number): boolean {
    return this.completedSteps[step - 1];
  }

  // Segna uno step come completato
  markStepAsCompleted(step: number) {
    this.completedSteps[step - 1] = true;
  }

  // Funzione per aggiornare currentStep in base all'URL
  private updateCurrentStepFromURL(url: any) {
    // Verifica l'URL e aggiorna currentStep in base alla rotta
    if (url[0].path === 'new-announcement-step2') {
      this.currentStep = 2;
    } else if (url[0].path === 'new-announcement-step3') {
      this.currentStep = 3;
    } else if (url[0].path === 'new-announcement-step4') {
      this.currentStep = 4;
    } else {
      this.currentStep = 1; // Default se non corrisponde a nessun passo
    }
  }

  // Segna uno step come completato
  private updateStepCompletion(step: number) {
    if (step <= 4) {
      this.completedSteps[step - 1] = true;
    }
  }
}






















