import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountStatus } from 'src/app/enum/AccountStatus';
import { AccountModel } from 'src/app/models/AccountModel';
import { Payment } from 'src/app/models/payment/Payment';
import { SubscriptionModel } from 'src/app/models/payment/SubscriptionModel';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  account: AccountModel;
  dashboardForm: any;
  disable = true;
  subscription: SubscriptionModel;
  firstPayment: Payment;
  sorAccount: any;

  get inviteToken() {
    return this.dashboardForm.get('inviteToken');
  }

  get linkUrl() {
    return (
      'https%3A%2F%2Flogin.travined.com%3A8080%2F%23%2Fsignup%3FinviteToken%3D' +
      this.inviteToken.value +
      '&title=Travined'
    );
  }

  constructor(
    private cachingService: CachingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.dashboardForm = this.formBuilder.group({
      name: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      phone: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      accountStatus: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      role: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      creationDate: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      inviteToken: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ],
      subscription: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(1)]
      ]
    });
  }

  ngOnInit() {
    this.account = this.cachingService.getSession();
    this.sorAccount = this.cachingService.getSorAccount();
    this.subscription = this.cachingService.getSubscriptionCache();
    this.firstPayment = this.cachingService.getFirstPaymentCache();
    this.dashboardForm.patchValue({ ...this.account });
  }

  public getSubscriptionName() {
    if (this.subscription) {
      return this.subscription.product.name;
    } else if (this.firstPayment) {
      return this.firstPayment.shoppingCart.products[0].product.name;
    } else {
      // get based on the clubID
      return "Travined Explorer<br>⭐⭐⭐⭐⭐<br>5 Stars (Special Access)"
    }
  }

  isNewAccount() {
    const newAccountStatus = AccountStatus.New;
    const currentAccountStatus = this.account.accountStatus;
    const check = currentAccountStatus === newAccountStatus;
    return check;
  }
}
