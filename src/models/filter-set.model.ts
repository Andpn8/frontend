export interface FilterSet {
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  rooms: number | null;
  bathrooms: number | null;
  minSurface: number | null;
  maxSurface: number | null;
  energyClass: string;
  services: {
    portineria: boolean;
    garage: boolean;
    climatizzazione: boolean;
    sicurezza: boolean;
    ascensore: boolean;
    accessoDisabili: boolean;
  };
}