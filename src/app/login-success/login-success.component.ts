import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-success',
  template: `<p>Login in corso...</p>`
})
export class LoginSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.saveToken(token);
        this.router.navigate(['/']); // oppure '/dashboard' o qualsiasi pagina post-login
      } else {
        alert('Errore nel login con Google');
        this.router.navigate(['/login']);
      }
    });
  }
}
