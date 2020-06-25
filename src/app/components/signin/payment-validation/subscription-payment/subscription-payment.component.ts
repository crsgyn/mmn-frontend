import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { PaymentMethod } from 'src/app/enum/PaymentMethod';
import { ShoppingCartStatus } from 'src/app/enum/ShoppingCartStatus';
import { ShoppingType } from 'src/app/enum/ShoppingType';
import { AccountModel } from 'src/app/models/AccountModel';
import { CartProduct } from 'src/app/models/payment/CartProduct';
import { Payment } from 'src/app/models/payment/Payment';
import { Product } from 'src/app/models/payment/Product';
import { ShoppingCart } from 'src/app/models/payment/ShoppingCart';
import { SubscriptionModel } from 'src/app/models/payment/SubscriptionModel';
import { PaymentService } from 'src/app/services/backend/payment.service';
import { CachingService } from 'src/app/services/caching.service';
import { PaypalTransactionStatus } from 'src/app/enum/PaypalTransationStatus';

declare var paypal;

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.scss']
})
export class SubscriptionPaymentComponent implements OnInit {
  @Output() completedSubscription = new EventEmitter();
  @ViewChild('paypal') paypalElement: ElementRef;

  products: Product[];
  shoppingCart: ShoppingCart;
  account: AccountModel;

  constructor(
    private paymentService: PaymentService,
    private cachingService: CachingService
  ) {}

  ngOnInit() {
    this.account = this.cachingService.getSession();
    this.paymentService.getAllSubscriptionProducts().subscribe(
      (subscriptionProducts: Product[]) => {
        console.log(
          'TCL: SubscriptionPaymentComponent -> ngOnInit -> subscriptionProducts',
          subscriptionProducts
        );
        if (subscriptionProducts) {
          this.cachingService.saveSubscriptionProductList(subscriptionProducts);
          this.products = subscriptionProducts;
        }
      },
      subscriptionProductsError => {
        console.log(
          'TCL: SubscriptionPaymentComponent -> ngOnInit -> subscriptionProductsError',
          subscriptionProductsError
        );
      }
    );
  }

  public selectSubscription(item: Product) {
    this.shoppingCart = new ShoppingCart();
    const cartProduct = new CartProduct();
    cartProduct.product = item;
    cartProduct.quantity = 1;
    cartProduct.price = item.price;
    const cartProducts = new Array<CartProduct>(cartProduct);
    this.shoppingCart.products = cartProducts;
    this.addPaypalButton();
  }

  private addPaypalButton() {
    if (this.paypalElement) {
      this.removePaypalButton();
    }
    paypal
      .Buttons(this.createPaypalOrder(this.shoppingCart))
      .render(this.paypalElement.nativeElement);
  }

  private removePaypalButton() {
    this.paypalElement.nativeElement.innerHTML = null;
  }

  // ORDER
  private createPaypalOrder(shoppingCart: ShoppingCart) {
    return {
      createOrder: (data: any, actions: any) => {
        return this.onCreateOrder(actions, shoppingCart);
      },
      onApprove: async (data: any, actions: any) => {
        this.onApproveOrder(data, actions);
      },
      onError: async (error: any) => {
        console.log(error);
      }
    };
  }

  private onCreateOrder(actions: any, shoppingCart: ShoppingCart) {
    const intent = 'CAPTURE';
    const currency_code = 'USD';
    const description = shoppingCart.products
      .map(CartProduct => CartProduct.product.name)
      .reduce((acc, pilot) => acc + ', ' + pilot);
    const value = shoppingCart.products
      .map(p => p.price)
      .reduce((acc, pilot) => acc + pilot, 0)
      .toString();
    const orderRequest = {
      intent: intent,
      purchase_units: [
        {
          amount: {
            currency_code: currency_code,
            value: value
          },
          description: description
        }
      ]
    };
    console.log(
      'TCL: SubscriptionPaymentComponent -> onCreateOrder -> orderRequest',
      orderRequest
    );
    return actions.order.create(orderRequest);
  }

  private async onApproveOrder(data: any, actions: any) {
    const orderResponse = await actions.order.capture();
    console.log(
      'TCL: SubscriptionPaymentComponent -> onApproveOrder -> orderResponse',
      orderResponse
    );

    // persistOrderInBD
    const units = orderResponse.purchase_units[0];

    const payment = new Payment();
    payment.id = orderResponse.id;
    payment.method = PaymentMethod.Paypal;
    payment.value = units.amount.value;
    payment.currency_code = units.amount.currency_code;

    this.shoppingCart.shoppingCartStatus = ShoppingCartStatus.Confirmed;
    this.shoppingCart.shoppingType = ShoppingType.Subscription;
    this.shoppingCart.accountId = this.account.id;
    payment.shoppingCart = this.shoppingCart;

    // caching payment
    this.cachingService.savePaypalPayment(payment);

    this.paymentService.savePayment(payment).subscribe(
      (subscriptionData: Payment) => {
        console.log(
          'TCL: SubscriptionPaymentComponent -> onApproveOrder -> subscriptionData',
          subscriptionData
        );
        if (subscriptionData) {
          this.cachingService.saveFirstPaymentCache(subscriptionData);
          // emit event to parent
          this.completedSubscription.emit({
            status: PaypalTransactionStatus.Successful
          });
        }
      },
      subscriptionError => {
        console.log(
          'TCL: SubscriptionPaymentComponent -> onApproveOrder -> subscriptionError',
          subscriptionError
        );
      }
    );
  }
}
