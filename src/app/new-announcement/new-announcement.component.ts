import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.scss'],
  imports: [NavbarComponent, AnnouncementSummaryComponent]
})
export class NewAnnouncementComponent {}


