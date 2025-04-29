import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    console.log('Username:', this.username, 'Password:', this.password);
    // Qui metti la logica reale per autenticazione
  }

  goBack(): void {
    this.router.navigate(['/']); // Oppure il percorso desiderato
  }
  goToRegister(): void {
    this.router.navigate(['/register']); // Modifica il percorso in base alla tua configurazione
  }
}
