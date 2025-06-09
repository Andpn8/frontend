import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";

@Component({
  selector: 'app-new-announcement-recap',
  standalone: true,
  templateUrl: './new-announcement-recap.component.html',
  styleUrls: ['./new-announcement-recap.component.scss'],
  imports: [NavbarComponent, AnnouncementSummaryComponent]
})
export class NewAnnouncementRecapComponent implements AfterViewInit {

  @ViewChild('headerContent') headerContent!: ElementRef;
  headerWidth = 0;
  selectedImage = '';
  selectedPlanimetria = '';

  constructor(private router: Router) {} 

  ngAfterViewInit() {
    this.headerWidth = this.headerContent.nativeElement.offsetWidth;
  }


  getServiziAttivi(serv: Record<string,boolean>): string[] {
    return Object.entries(serv).filter(([_,a])=>a).map(([n])=>n.replace(/_/g,' '));
  }

  goBack(): void {
    this.router.navigate(['/home']); 
  }
}
