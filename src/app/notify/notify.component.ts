import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { NotificationService, Notifica } from '../../services/notification.service';

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  notifications: Notifica[] = [];
  selectedNotification: Notifica | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifiche().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Errore nel caricamento notifiche:', err);
      }
    });
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.letta).length;
  }

  deleteNotification(notification: Notifica): void {
    this.notificationService.deleteNotifica(notification.notificaId).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.notificaId !== notification.notificaId);
        if (this.selectedNotification?.notificaId === notification.notificaId) {
          this.closeNotification();
        }
      },
      error: (err) => console.error('Errore nella cancellazione:', err)
    });
  }

  openNotification(notification: Notifica): void {
    if (!notification.letta) {
      this.notificationService.markAsRead(notification.notificaId).subscribe({
        next: () => {
          notification.letta = true;
        },
        error: (err) => console.error('Errore nel segnare come letta:', err)
      });
    }
    this.selectedNotification = notification;
  }

  closeNotification(): void {
    this.selectedNotification = null;
  }
}
