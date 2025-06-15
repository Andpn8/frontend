// agent-admin-ceo.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgentAdminCeoGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRoleFromToken();
    if (role === 'agent' || role === 'admin' || role === 'ceo') {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}