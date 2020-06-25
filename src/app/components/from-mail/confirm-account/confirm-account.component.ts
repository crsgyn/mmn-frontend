import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/backend/account.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  accountId: string = null;
  accountDoesntExistMsg: boolean = false;
  confirmed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.accountId = params['token'];

      if (this.accountId) {
        this.accountService.mailConfirm(this.accountId).subscribe(
          account => {
            if (account) {
              this.confirmed = true;
            }
            console.log(account);
          },
          error => {
            this.accountDoesntExistMsg = true;
            console.log(error);
          }
        );
      }
    });
  }

}
