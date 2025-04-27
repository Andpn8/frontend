import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent {
  notifications = [
    {
      title: 'Nuovo annuncio disponibile!',
      message: 'Un nuovo annuncio che potrebbe interessarti è stato appena pubblicato.',
      date: new Date('2025-04-24'),
      read: false
    },
    {
      title: 'Messaggio dall’amministratore',
      message: 'Ricorda di aggiornare il tuo profilo per rimanere sempre aggiornato.',
      date: new Date('2025-04-23'),
      read: false
    }
  ];

  selectedNotification: any = null;

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  deleteNotification(notification: any): void {
    this.notifications = this.notifications.filter(n => n !== notification);
    if (this.selectedNotification === notification) {
      this.closeNotification();
    }
  }

  openNotification(notification: any): void {
    notification.read = true;
    this.selectedNotification = notification;
  }

  closeNotification(): void {
    this.selectedNotification = null;
  }
}
