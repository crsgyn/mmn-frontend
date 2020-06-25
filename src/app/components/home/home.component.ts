import { Component } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  account: AccountModel;
  constructor(private cachingService: CachingService) {}

  ngOnInit() {
    this.cachingService.deleteSecret();
    this.account = this.cachingService.getSession();
    // console.log(this.account);
  }

  isAdmin(){
    return this.account.role ===  'ADMIN';
  }
}
