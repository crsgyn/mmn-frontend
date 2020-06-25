import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaypalTransactionStatus } from 'src/app/enum/PaypalTransationStatus';
import { AccountModel } from 'src/app/models/AccountModel';
import { SubscriptionModel } from 'src/app/models/payment/SubscriptionModel';
import { PaymentService } from 'src/app/services/backend/payment.service';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-payment-validation',
  templateUrl: './payment-validation.component.html',
  styleUrls: ['./payment-validation.component.scss']
})
export class PaymentValidationComponent implements OnInit, OnDestroy {
  account: AccountModel;
  paid = false;

  $sub1: Subscription;

  constructor(
    private cachingService: CachingService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.$sub1) {
      this.$sub1.unsubscribe();
    }
  }

  ngOnInit() {
    this.account = this.cachingService.getSession();
    if(this.isInvestorOrAmbassador()) {
      this.navigate();
    }
    this.$sub1 = this.paymentService
      .findLatestSubscriptionBy(this.account.id)
      .subscribe(
        (subscription: SubscriptionModel) => {
          if (subscription) {
            if (this.validateSubscriptionDate(subscription)) {
              this.cachingService.saveSubscriptionCache(subscription);
              this.navigate();
            }
          }
        },
        subscriptionError => {
          console.log(
            'TCL: PaymentValidationComponent -> ngOnInit -> subscriptionError',
            subscriptionError
          );
        }
      );
    const subscription: SubscriptionModel = this.cachingService.getSubscriptionCache();
    if (subscription) {
      this.navigate();
    }
  }

  private validateSubscriptionDate(subscription: SubscriptionModel): boolean {
    const loginDate = new Date();
    const currSubDate = new Date(subscription['current']);
    const nextSubDate = new Date(subscription['next']);
    const result = loginDate >= currSubDate && loginDate <= nextSubDate;
    console.log(
      'TCL: PaymentValidationComponent -> validateSubscriptionDate -> currSubDate < loginDate < nextSubDate == result',
      currSubDate,
      loginDate,
      nextSubDate,
      result
    );
    return result;
  }

  public receiveConfirmation(event: any) {
    this.paid = event.status === PaypalTransactionStatus.Successful;
  }

  navigate() {
    this.router.navigate(['sor-validation']);
  }

  isPrivilegedAccount() {
    return AccountModel.isPrivilegedAccount(this.account.role);
  }

  isInvestorOrAmbassador() {
    return AccountModel.isInvestorOrAmbassador(this.account.role);
  }
}
