import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { InsertionService } from '../../services/insertion.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  userRole: 'guest' | 'agent' | 'user' | 'ceo' | 'admin' = 'guest';
  annunci: any[] = [];
  currentPage: number = 1;
  annunciPerPagina: number = 7;

  constructor(
    private authService: AuthService,
    private insertionService: InsertionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = this.authService.getUserRoleFromToken();

      this.insertionService.getAllSales().subscribe(data => {
        this.annunci = data;
      });
    }
  }

  get annunciPaginati(): any[] {
    const start = (this.currentPage - 1) * this.annunciPerPagina;
    return this.annunci.slice(start, start + this.annunciPerPagina);
  }

  cambiaPagina(pagina: number) {
    this.currentPage = pagina;
  }

  get numeroPagine(): number[] {
    return Array(Math.ceil(this.annunci.length / this.annunciPerPagina)).fill(0).map((_, i) => i + 1);
  }
}
