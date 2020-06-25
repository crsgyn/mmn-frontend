import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  account: AccountModel;
  constructor(private cachingService: CachingService) {}

  ngOnInit() {
    this.account = this.cachingService.getSession();
    // console.log(this.account);
  }

  isAdmin() {
    return this.account.role ===  'ADMIN';
  }

}
