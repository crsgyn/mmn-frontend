import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  account: AccountModel;
  constructor(private cachingService: CachingService) {}

  ngOnInit() {
    this.account = this.cachingService.getSession();
    // console.log(this.account);
  }
}
