import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AlertService } from '../../services/alert.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthService,
  ) { }

  // display signup card image
  signUp() {
    this.router.navigateByUrl('/register')
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
  }


  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigateByUrl('/home');
        },
        error => {
          alert('User does note exist!')
          this.loading = false;
        },
      );
  }
  logout() {
    // remove user from local storage to log user out
    this.authenticationService.logout()
  }

}
