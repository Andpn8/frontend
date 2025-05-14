import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-announcement-summary',
  templateUrl: './announcement-summary.component.html',
  styleUrls: ['./announcement-summary.component.scss'],
  imports: [CommonModule]
})
export class AnnouncementSummaryComponent {
  @Input() activeStep: number = 1;
}
