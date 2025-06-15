import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-success',
  template: `<p>Login in corso...</p>`
})
export class LoginSuccessComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.saveToken(token);
        this.router.navigate(['/']);
      } else {
        this.snackBar.open("Errore nel login.", "Chiudi", {
    duration: 3000
  })
        this.router.navigate(['/login']);
      }
    });
  }
}
