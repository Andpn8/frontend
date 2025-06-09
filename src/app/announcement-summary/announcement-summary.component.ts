import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-summary',
  templateUrl: './announcement-summary.component.html',
  styleUrls: ['./announcement-summary.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AnnouncementSummaryComponent implements OnInit {
  @Input() activeStep: number = 1;
  announcementData: any = {};

  constructor() {}

  ngOnInit() {
  }
}
