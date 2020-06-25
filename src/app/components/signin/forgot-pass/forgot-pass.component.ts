import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/backend/account.service';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  logo = ENV.imageLogoBig;

  forgotForm: any;
  successful: boolean = false;
  accountDoesntExistMSG: boolean = false;

  get email() {
    return this.forgotForm.get('email');
  }

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  validateBeforeSubmit() {
    if (this.forgotForm.valid) {
      this.changePass(this.email.value);
    }
  }

  changePass(changePass: string) {
    this.accountService.forgot(changePass).subscribe(
      (forgotPassResponse: string) => {
      console.log("TCL: ForgotPassComponent -> changePass -> forgotPassResponse", forgotPassResponse)
        if (forgotPassResponse) {
          this.successful = true;
        }
      },
      forgotPassError => {
      console.log("TCL: ForgotPassComponent -> changePass -> forgotPassError", forgotPassError)
        if (forgotPassError.error.status === 409) {
          this.accountDoesntExistMSG = true;
        }
        this.successful = false;
      }
    );
  }
}
