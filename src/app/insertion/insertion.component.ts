import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-insertion',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './insertion.component.html',
  styleUrls: ['./insertion.component.scss']
})
export class InsertionComponent implements AfterViewInit {
  images: string[] = [
    'https://i.imgur.com/6j71c1M.jpeg',
    'https://i.imgur.com/lilZsCz.jpeg',
    'https://i.imgur.com/2my8Gzx.jpeg',
    'https://i.imgur.com/dUpemzA.jpeg',
    'https://i.imgur.com/osNlI7Y.jpeg',
    'https://i.imgur.com/UP4421q.jpeg',
    'https://i.imgur.com/OMh9wlC.jpeg',
    'https://i.imgur.com/gKLmjQ4.jpeg',
  ];
  selectedImage: string = this.images[0];

  @ViewChild('headerContent') headerContent!: ElementRef<HTMLDivElement>;
  headerWidth: number = 0;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.headerWidth = this.headerContent.nativeElement.offsetWidth;

    window.addEventListener('resize', () => {
      this.headerWidth = this.headerContent.nativeElement.offsetWidth;
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  selectImage(index: number) {
    this.selectedImage = this.images[index];
  }

  prevImage() {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const prevIndex = (currentIndex === 0) ? this.images.length - 1 : currentIndex - 1;
    this.selectedImage = this.images[prevIndex];
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.selectedImage);
    const nextIndex = (currentIndex === this.images.length - 1) ? 0 : currentIndex + 1;
    this.selectedImage = this.images[nextIndex];
  }
}
