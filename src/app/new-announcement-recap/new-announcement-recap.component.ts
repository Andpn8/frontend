import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-announcement-recap',
  standalone: true,
  templateUrl: './new-announcement-recap.component.html',
  styleUrls: ['./new-announcement-recap.component.scss'],
  imports: [NavbarComponent, AnnouncementSummaryComponent,CommonModule]
})
export class NewAnnouncementRecapComponent implements AfterViewInit {

  @ViewChild('headerContent') headerContent!: ElementRef;
  headerWidth = 0;
    images: string[] = [];
  selectedImage: string = '';
  planimetrie: string[] = [];
  selectedPlanimetria: string = '';

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

  selectImage(index: number): void {
    this.selectedImage = this.images[index];
  }

  prevImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const prevIndex = currentIndex === 0 ? this.images.length - 1 : currentIndex - 1;
    this.selectedImage = this.images[prevIndex];
  }

  nextImage(): void {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const nextIndex = currentIndex === this.images.length - 1 ? 0 : currentIndex + 1;
    this.selectedImage = this.images[nextIndex];
  }

  selectPlanimetria(index: number): void {
    this.selectedPlanimetria = this.planimetrie[index];
  }

  prevPlanimetria(): void {
    const currentIndex = this.planimetrie.indexOf(this.selectedPlanimetria);
    const prevIndex = currentIndex === 0 ? this.planimetrie.length - 1 : currentIndex - 1;
    this.selectedPlanimetria = this.planimetrie[prevIndex];
  }

  nextPlanimetria(): void {
    const currentIndex = this.planimetrie.indexOf(this.selectedPlanimetria);
    const nextIndex = currentIndex === this.planimetrie.length - 1 ? 0 : currentIndex + 1;
    this.selectedPlanimetria = this.planimetrie[nextIndex];
  }
}
