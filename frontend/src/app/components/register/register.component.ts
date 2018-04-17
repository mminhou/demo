import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent {
  model: any = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ){}



  register() {
    this.userService.create(this.model)
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('Registration successful', true);
          this.router.navigateByUrl('/login');
        },
        error => {
          this.alertService.error('Username already exist');
        });
  }
}

