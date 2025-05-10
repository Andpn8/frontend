  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { CommonModule } from '@angular/common';
  import { NavbarComponent } from "../navbar/navbar.component";
  import { Router } from '@angular/router';
  import { FooterComponent } from "../footer/footer.component";

  @Component({
    selector: 'app-profile-info',
    standalone: true,
    imports: [CommonModule, NavbarComponent, FooterComponent],
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss']
  })
  export class ProfileInfoComponent implements OnInit {
    user: any = null;

    constructor(
      private router: Router,
      private authService: AuthService
    ) {}

    ngOnInit(): void {
      const token = this.authService.getToken();
      if (token) {
        this.authService.getProfile(token).subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (err) => {
            console.error('Errore nel caricamento del profilo:', err);
          }
        });
      }
    }

    goBack(): void {
      this.router.navigate(['/']);
    }
  }
