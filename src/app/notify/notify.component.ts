import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { NotificationService, Notifica as NotificaUser } from '../../services/notification.service';
import { NotificationAgenteService, NotificaAgente } from '../../services/notification-agente.service';
import { AuthService } from '../../services/auth.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

type Notifica = NotificaUser | NotificaAgente;

@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  notifications: Notifica[] = [];
  selectedNotification: Notifica | null = null;
  userRole: 'user' | 'agent' | 'guest' = 'guest';
  showDeleteConfirm = false;
  notificationToDelete: Notifica | null = null;
  showDeleteSuccess = false;
  notifyStatus: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private notificationAgenteService: NotificationAgenteService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = this.authService.getUserRoleFromToken() as 'user' | 'agent' | 'guest';
      this.loadNotifications();
      this.loadNotificationStatus();
    }
  }

  loadNotifications(): void {
    if (this.userRole === 'agent') {
      this.notificationAgenteService.getNotifiche().subscribe({
        next: (data) => this.notifications = data,
        error: (err) => console.error('Errore nel caricamento notifiche agente:', err)
      });
    } else if (this.userRole === 'user') {
      this.notificationService.getNotifiche().subscribe({
        next: (data) => this.notifications = data,
        error: (err) => console.error('Errore nel caricamento notifiche utente:', err)
      });
    } else {
      console.warn('Ruolo non riconosciuto, nessuna notifica caricata.');
    }
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.letta).length;
  }

  confirmDelete(notification: Notifica, event: MouseEvent): void {
    event.stopPropagation();
    this.notificationToDelete = notification;
    this.showDeleteConfirm = true;
  }

  proceedDelete(): void {
  if (!this.notificationToDelete) return;
  
  const notification = this.notificationToDelete;
  const service = this.userRole === 'agent' ? this.notificationAgenteService : this.notificationService;
  
  this.cancelDelete();
  
  service.deleteNotifica(notification.notificaId).subscribe({
    next: () => {
      this.notifications = this.notifications.filter(n => n.notificaId !== notification.notificaId);
      if (this.selectedNotification?.notificaId === notification.notificaId) {
        this.closeNotification();
      }
      
      setTimeout(() => {
        this.showDeleteSuccess = true;
      }, 300);
    },
    error: (err) => {
      console.error('Errore nella cancellazione:', err);
    }
  });
}

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.notificationToDelete = null;
  }

  closeDeleteSuccess(): void {
    this.showDeleteSuccess = false;
  }

  openNotification(notification: Notifica): void {
    if (!notification.letta) {
      const service = this.userRole === 'agent' ? this.notificationAgenteService : this.notificationService;
      service.markAsRead(notification.notificaId).subscribe({
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

   loadNotificationStatus(): void {
    if (this.userRole === 'user') {
      this.authService.getNotificationSettings().subscribe({
        next: (response) => {
          this.notifyStatus = response.notify;
        },
        error: (err) => {
          console.error('Errore nel caricamento delle impostazioni notifiche:', err);
        }
      });
    }
  }

  updateNotificationStatus(): void {
    if (this.userRole === 'user') {
      this.authService.updateNotificationSettings(this.notifyStatus).subscribe({
        next: () => {
          console.log('Impostazioni notifiche aggiornate con successo');
        },
        error: (err) => {
          console.error('Errore nell\'aggiornamento delle impostazioni:', err);
          this.notifyStatus = !this.notifyStatus;
        }
      });
    }
  }
}