import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { InsertionService } from '../../services/insertion.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ActivatedRoute } from '@angular/router';
import { FilterSet } from '../../models/filter-set.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent
],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  userRole: 'guest' | 'agent' | 'user' | 'ceo' | 'admin' = 'guest';
  annunci: any[] = [];
  currentPage: number = 1;
  annunciPerPagina: number = 4;
  modalitaCatalogo: 'vendita' | 'affitto' = 'vendita';

 constructor(
  private authService: AuthService,
  private insertionService: InsertionService,
  private route: ActivatedRoute,
  private router: Router,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.userRole = this.authService.getUserRoleFromToken();

    this.route.queryParams.subscribe(params => {
      const filters: FilterSet = params['filters'] ? JSON.parse(params['filters']) : {};

      const fetchData$ = filters.buyOrRent === 'rent'
        ? this.insertionService.getAllRentals()
        : this.insertionService.getAllSales();

      fetchData$.subscribe(data => {
  this.modalitaCatalogo = filters.buyOrRent === 'rent' ? 'affitto' : 'vendita';
  this.annunci = filters ? this.filtraAnnunci(data, filters) : data;
});
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

  filtraAnnunci(annunci: any[], filters: FilterSet): any[] {
  return annunci.filter(annuncio => {
    const matchesPropertyType = !filters.propertyType || annuncio.tipologia_immobile === filters.propertyType;
    const matchesLocation = !filters.location || annuncio.comune?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrezzo = (!filters.minPrice || annuncio.prezzo >= filters.minPrice)
                       && (!filters.maxPrice || annuncio.prezzo <= filters.maxPrice);
    const matchesRooms = !filters.rooms || annuncio.locali == filters.rooms;
    const matchesBathrooms = !filters.bathrooms || annuncio.bagni == filters.bathrooms;
    const matchesSurface = (!filters.minSurface || annuncio.superficie >= filters.minSurface)
                        && (!filters.maxSurface || annuncio.superficie <= filters.maxSurface);
    const energy = annuncio.classe_energetica?.toUpperCase();

    const matchesEnergy = 
      filters.energyClass === 'tutte' || (
        filters.energyClass === 'alta' && (energy === 'A' || energy === 'A+')
      ) || (
        filters.energyClass === 'media' && ['B', 'C', 'D'].includes(energy)
      ) || (
        filters.energyClass === 'bassa' && ['E', 'F', 'G'].includes(energy)
      );
    const matchesServices = Object.entries(filters.services).every(([key, value]) => {
      return !value || annuncio.servizi?.includes(key);
    });

    return matchesPropertyType && matchesLocation && matchesPrezzo && matchesRooms && matchesBathrooms &&
           matchesSurface && matchesEnergy && matchesServices;
  });
}
vaiADettaglio(annuncio: any) {
  this.router.navigate(['/insertion'], {
    state: {
      annuncio,
      modalitaCatalogo: this.modalitaCatalogo
    }
  });
}
}
