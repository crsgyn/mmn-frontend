import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/backend/account.service';
import { CachingService } from 'src/app/services/caching.service';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  logo = ENV.imageLogoBig;

  forgotForm: any;
  successful: boolean = false;
  accountDoesntExistMSG: boolean = false;

  get password() {
    return this.forgotForm.get('password');
  }

  get repeatPass() {
    return this.forgotForm.get('repeatPass');
  }

  validatePasswords(group: AbstractControl) {
    const pass = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return pass === confirm ? null : { invalid: true };
  }

  constructor(
    private accountService: AccountService,
    private cachingService: CachingService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.forgotForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: [this.validatePasswords] }
    );
  }

  ngOnInit() {}

  validateBeforeSubmit() {
    if (this.forgotForm.valid) {
      this.changePass(this.password.value);
    }
  }

  changePass(changePass: string) {
    const recoverAccount = this.cachingService.getAccountRecover();
    this.accountService.changePass(changePass, recoverAccount).subscribe(
      (changePassResponse: number) => {
        console.log(
          'TCL: ChangePasswordComponent -> changePass -> changePassResponse',
          changePassResponse
        );
        if (changePassResponse) {
          this.successful = true;
        }
      },
      changePassError => {
        console.log(
          'TCL: ChangePasswordComponent -> changePass -> changePassError',
          changePassError
        );
        if (changePassError.error.status === 409) {
          this.accountDoesntExistMSG = true;
        }
        this.successful = false;
      }
    );
  }
}
