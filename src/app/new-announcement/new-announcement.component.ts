import { Component } from '@angular/core';
import { AnnouncementSummaryComponent } from "../announcement-summary/announcement-summary.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.scss'],
  standalone: true,
  imports: [NavbarComponent, AnnouncementSummaryComponent, FooterComponent] // Importazione corretta
 // Importazione corretta
})
export class NewAnnouncementComponent {
  announcementType: 'vendita' | 'affitto' = 'vendita';

  setAnnouncementType(type: 'vendita' | 'affitto') {
    this.announcementType = type;
  }
}







