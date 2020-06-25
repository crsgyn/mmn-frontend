import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';
import { Payment } from '../../models/payment/Payment';
import { Product } from '../../models/payment/Product';
import { ShoppingCart } from '../../models/payment/ShoppingCart';
import { PaymentMockService } from '../payment.mock.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private http: HttpClient,
    private mockService: PaymentMockService
  ) {}

  public getAllSubscriptionProducts(): Observable<Product[]> {
    if(ENV.useMock) {
      return of(this.mockService.mockProductList);
    }
    return this.http.get<Product[]>(`${ENV.paymentServiceURL}/subscription-products`);
  }

  public getAllProducts(): Promise<Product[]> {
    return ENV.useMock
      ? new Promise(resolve => resolve(this.mockService.mockProductList))
      : this.http
          .get<Product[]>(`${ENV.paymentServiceURL}/products`)
          .toPromise();
  }

  public saveShoppingCart(ShoppingCart: ShoppingCart) {
    return this.http.post<ShoppingCart>(
      `${ENV.paymentServiceURL}/shopping-cart`,
      ShoppingCart
    );
  }

  public savePayment(payment: Payment) {
    return this.http.post<Payment>(
      `${ENV.paymentServiceURL}/payments`,
      payment
    );
  }

  public findLatestSubscriptionBy(accountId: string) {
    return this.http.get<any>(
      `${ENV.paymentServiceURL}/subscriptions/${accountId}`
    );
  }
}
