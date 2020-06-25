import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/backend/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
  recoverToken: string = null;
  accountDoesntExistMsg: boolean = false;
  recovered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private cachingService: CachingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.recoverToken = params['recoverToken'];

      if (this.recoverToken) {
        this.accountService.mailForgot(this.recoverToken).subscribe(
          account => {
            if (account) {
              this.cachingService.saveRecover(account);
              this.router.navigate(['change-pass']);
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
