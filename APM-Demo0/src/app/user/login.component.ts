import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      if (!user) return;

      this.maskUserName = user.maskUserName;
    });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch({ type: '[User] Toggle Mask Username' });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
