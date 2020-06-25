import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountModel } from 'src/app/models/AccountModel';
import { Login } from 'src/app/models/Login';
import { AccountService } from 'src/app/services/backend/account.service';
import { CachingService } from 'src/app/services/caching.service';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  logo = ENV.imageLogoBig;

  loginForm: any;
  invalidLoginMSG = false;
  serviceDownMSG = false;
  $sub1: Subscription;

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private accountService: AccountService,
    private cachingService: CachingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    if (this.$sub1) {
      this.$sub1.unsubscribe();
    }
  }
  ngOnInit() {}

  public validateBeforeSubmit() {
    if (this.loginForm.valid) {
      const login = new Login();
      login.login = this.login.value;
      login.password = this.password.value;
      this.invalidateERROS();
      this.doLogin(login);
    }
  }

  private doLogin(login: Login) {
    this.$sub1 = this.accountService.login(login).subscribe(
      (logginResponse: AccountModel) => {
        console.log(
          'TCL: SigninComponent -> doLogin -> logginResponse',
          logginResponse
        );
        if (logginResponse) {
          this.cachingService.saveSession(logginResponse);
          this.cachingService.saveSecret(login.password);
          this.navigate();
        }
      },
      loginError => {
        console.log(
          'TCL: SigninComponent -> doLogin -> loginError',
          loginError
        );
        if (
          loginError.error['message'] === 'Service is down. Please try later'
        ) {
          this.serviceDownMSG = true;
        } else {
          this.invalidLoginMSG = true;
        }
      }
    );
  }

  private navigate() {
    // redirect to home page
    this.router.navigate(['payment-validation']);
  }

  private invalidateERROS() {
    this.invalidLoginMSG = false;
    this.serviceDownMSG = false;
  }
}
