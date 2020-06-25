import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductIdsEnum } from 'src/app/enum/ProductIdsEnum';
import { SorAccountTypeId } from 'src/app/enum/sor-enums/SorAccountTypeId';
import { SorSubscriptionPlans } from 'src/app/enum/sor-enums/SorSubscriptionPlans';
import { AccountModel } from 'src/app/models/AccountModel';
import { Product } from 'src/app/models/payment/Product';
import { IDecideAccount } from 'src/app/models/sor/IDecideAccount';
import { SorResponse } from 'src/app/models/sor/SorResponse';
import { IDecideService } from 'src/app/services/backend/idecide.service';
import { SorService } from 'src/app/services/backend/sor.service';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-sor-account-validation',
  templateUrl: './sor-account-validation.component.html',
  styleUrls: ['./sor-account-validation.component.scss']
})
export class SorAccountValidationComponent implements OnInit, OnDestroy {
  sorErrorMSG: boolean;
  serviceDownMSG: boolean;
  sorAccount: any;
  $sub1: Subscription;
  $sub2: Subscription;

  constructor(
    private cachingService: CachingService,
    private sorService: SorService,
    private idecideService: IDecideService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.$sub1) {
      this.$sub1.unsubscribe();
    }

    if (this.$sub2) {
      this.$sub2.unsubscribe();
    }
  }

  ngOnInit() {
    console.log(SorAccountTypeId.LifeTime);
    const account = this.cachingService.getSession();
    const secret = this.cachingService.getSecret();
    const subscriptionId = AccountModel.isPrivilegedAccount(account.role)
      ? SorSubscriptionPlans.FiveStars
      : this.checkPlanBasedOnPayment();
    const accountTypeId = SorAccountTypeId.OneMonth; // AccountModel.isPrivilegedAccount(account.role) ? SorAccountTypeId.LifeTime : SorAccountTypeId.OneMonth;
    const checkSorMemberPayload = [{ Email: account.email }];
    this.$sub1 = this.sorService.sorMembers(checkSorMemberPayload).subscribe(
      (sorMemberList: Array<any>) => {
        console.log(
          'TCL: SorAccountValidationComponent -> ngOnInit -> sorMemberList',
          sorMemberList
        );
        // member exist in SOR
        if (sorMemberList && sorMemberList.length > 0) {
          this.cachingService.saveSorAccount(sorMemberList[0]);
          this.navigate();
        } else {
          this.sorCreateFlow(account, secret, subscriptionId, accountTypeId);
        }
      },
      sorMemberError => {
        console.log(
          'TCL: SorAccountValidationComponent -> ngOnInit -> sorMemberError',
          sorMemberError
        );
        if (
          sorMemberError.error['message'] ===
          'Service is down. Please try later'
        ) {
          this.serviceDownMSG = true;
        } else {
          this.sorErrorMSG = true;
        }
      }
    );

    if (
      [
        SorSubscriptionPlans.ThreeStars,
        SorSubscriptionPlans.FourStars,
        SorSubscriptionPlans.FiveStars
      ].filter(e => e === subscriptionId).length > 0
    ) {
      const idecideAccount = new IDecideAccount(
        account.email,
        account.phone,
        secret,
        account.name,
        account.lastName,
        'en',
        true
      );
      this.$sub2 = this.idecideService
        .idecideCreate(idecideAccount, account.id)
        .subscribe(
          idecideCreateResponse => {
            console.log(
              'TCL: SorAccountValidationComponent -> ngOnInit -> idecideCreateResponse',
              idecideCreateResponse
            );
          },
          idecideCreateError => {
            console.log(
              'TCL: SorAccountValidationComponent -> ngOnInit -> idecideCreateError',
              idecideCreateError
            );
          }
        );
    }
  }

  checkPlanBasedOnPayment(): string {
    const product: Product = this.cachingService.getPaymentProduct();
    console.log('TCL: SorAccountValidationComponent -> product', product);
    if (product) {
      return ProductIdsEnum.matchTranslationKey(product.description);
    }
    return SorSubscriptionPlans.Basic;
  }

  private navigate(): void {
    this.router.navigate(['']);
  }

  private sorCreateFlow(
    accountData: AccountModel,
    password: string,
    subscriptionId: string,
    accountTypeId: string
  ) {
    this.sorService
      .sorCreate(subscriptionId, accountData, password, accountTypeId)
      .subscribe(
        (sorResponse: SorResponse) => {
          console.log(
            'TCL: SignupComponent -> sorCreateFlow -> sorResponse',
            sorResponse
          );
          if (sorResponse && sorResponse.Account) {
            this.cachingService.saveSorAccount(sorResponse.Account);
          }
          this.navigate();
        },
        sorError => {
          console.log(
            'TCL: SignupComponent -> sorCreateFlow -> sorError',
            sorError
          );
          this.sorErrorMSG = true;
        }
      );
  }
}
