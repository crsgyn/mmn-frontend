import { Injectable } from '@angular/core';
import { Product } from '../models/payment/Product';

@Injectable({
  providedIn: 'root'
})
export class PaymentMockService {
  public mockProductList = [
    new Product({
      name: 'Travined Explorer',
      description: 'subscriptions.pack.1.description',
      price: 59.99,
      priceTC: 45
    }),
    new Product({
      name: 'Travined Explorer ⭐⭐⭐',
      description: 'subscriptions.pack.2.description',
      price: 299.99,
      priceTC: 225
    }),
    new Product({
      name: 'Travined Explorer ⭐⭐⭐⭐',
      description: 'subscriptions.pack.3.description',
      price: 499.99,
      priceTC: 375
    }),
    new Product({
      name: 'Travined Explorer ⭐⭐⭐⭐⭐',
      description: 'subscriptions.pack.4.description',
      price: 799.99,
      priceTC: 600
    })
  ];
}
