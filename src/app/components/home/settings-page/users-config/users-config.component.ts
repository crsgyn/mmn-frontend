import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { AccountService } from 'src/app/services/backend/account.service';

@Component({
  selector: 'app-users-config',
  templateUrl: './users-config.component.html',
  styleUrls: ['./users-config.component.scss']
})
export class UsersConfigComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  error = null;

  USERS = new Array<AccountModel>();

  showError() {
    return this.error;
  }

  ngOnInit() {
    this.accountService.listAll().subscribe((data: Array<AccountModel>) => {
      if (data) {
        this.USERS = data;
      }
    });
  }
}
