import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AccountModel } from '../models/AccountModel';
import { Payment } from '../models/payment/Payment';
import { SubscriptionModel } from '../models/payment/SubscriptionModel';
import { PaymentService } from '../services/backend/payment.service';
import { CachingService } from '../services/caching.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  constructor(
    public payment: PaymentService,
    public cachingService: CachingService,
    public router: Router
  ) {}

  canActivate(): boolean {
    const accountCache: AccountModel = this.cachingService.getSession();
    const paymentCache: Payment = this.cachingService.getFirstPaymentCache();
    const subscriptionCache: SubscriptionModel = this.cachingService.getSubscriptionCache();
    if (!this.paymentActive(accountCache, paymentCache, subscriptionCache)) {
      this.router.navigate(['signin']);
    }
    return true;
  }

  private paymentActive(
    account: AccountModel,
    paymentCache: Payment,
    subscriptionCache: SubscriptionModel
  ) {
    if (account) {
      if (['ADMIN', 'INVESTOR', 'AMBASSADOR'].indexOf(account.role) != -1) {
        return true;
      }
    }
    return paymentCache || subscriptionCache ? true : false;
  }
}
