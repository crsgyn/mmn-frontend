import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductIdsEnum } from 'src/app/enum/ProductIdsEnum';
import { AccountModel } from 'src/app/models/AccountModel';
import { Payment } from 'src/app/models/payment/Payment';
import { SubscriptionModel } from 'src/app/models/payment/SubscriptionModel';
import { AccountService } from 'src/app/services/backend/account.service';
import { SorService } from 'src/app/services/backend/sor.service';
import { CachingService } from 'src/app/services/caching.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { environment as ENV } from 'src/environments/environment';

export class Card {
  public constructor(
    public img,
    public title,
    public text,
    public link,
    public param: { param: string; value: string }
  ) {}
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  @ViewChild(ModalComponent) modalElement: ModalComponent;
  modalTitle = '';
  modalContent = '';

  logo = ENV.myTripLogo;
  account: AccountModel;
  cards = new Array<Card>();
  sorAccount: any;

  constructor(
    private sorService: SorService,
    private accountService: AccountService,
    private cachingService: CachingService
  ) {}

  ngOnInit() {
    this.account = this.cachingService.getSession();
    this.sorAccount = this.cachingService.getSorAccount();
    const subscription: SubscriptionModel = this.cachingService.getSubscriptionCache();
    const payment: Payment = this.cachingService.getFirstPaymentCache();
    let params;
    if (subscription) {
      params = subscription.product.params;
    } else if (payment) {
      params = payment.shoppingCart.products[0].product.params;
    }
    this.pushCards(params);
  }

  pushCards(params) {
    this.cards.push(
      new Card(
        ENV.imgHotel,
        'products.hotel.title',
        'products.hotel.text',
        '%2Frentals%2F',
        params ? params[0] : null
      ),
      new Card(
        ENV.imgFlight,
        'products.flight.title',
        'products.flight.text',
        '%2Fflights%2F',
        params ? params[1] : null
      ),
      new Card(
        ENV.imgCar,
        'products.car.title',
        'products.car.text',
        '%2Fcars%2F',
        params ? params[2] : null
      ),
      new Card(
        ENV.imgCruises,
        'products.cruises.title',
        'products.cruises.text',
        '%2Fcruises%2F',
        params ? params[3] : null
      ),
      new Card(
        ENV.imgHome,
        'products.home.title',
        'products.home.text',
        '%2Fhomes%2F',
        params ? params[4] : null
      ),
      new Card(
        ENV.imgWeeks,
        'products.weeks.title',
        'products.weeks.text',
        '%2Fweeks%2F',
        params ? params[5] : null
      )
    );

    console.log(
      'TCL: ProductsPageComponent -> pushCards -> this.cards',
      this.cards
    );
  }

  checkIfDisabledForCard(card): boolean {
    if (!card.param) return false;
    const cardV = card.param.value;
    return !(cardV === 'true');
  }

  navigateTo(cardLink: string) {
    this.modalTitle = 'sorModal.loadingTitle';
    this.modalContent = 'sorModal.loadingContent';
    this.modalElement.open();
    const subscriptionId = ProductIdsEnum.matchVacationClubId(
      this.sorAccount.VacationClubId
    );
    this.sorService
      .fetchTokenAndNavigate(subscriptionId, this.account, cardLink)
      .then(callingResult => {
        if (callingResult === 'success') {
          this.modalTitle = 'sorModal.redirectTitle';
          this.modalContent = 'sorModal.redirectContent';
        }
      })
      .catch(error => {
        this.modalTitle = 'sorModal.errorTitle';
        this.modalContent = 'sorModal.errorContent';
      });
  }
}
