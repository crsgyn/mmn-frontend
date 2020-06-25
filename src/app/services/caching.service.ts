import { Injectable } from '@angular/core';
import { AccountModel } from '../models/AccountModel';
import { Payment } from '../models/payment/Payment';
import { Product } from '../models/payment/Product';
import { SubscriptionModel } from '../models/payment/SubscriptionModel';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  constructor() {}

  // ACCOUNT CACHE
  saveSecret(secret: string): void {
    localStorage.setItem('xxxxx', btoa(secret));
  }

  saveSession(account: AccountModel): void {
    localStorage.setItem('session', JSON.stringify(account));
  }

  saveRecover(account: AccountModel): void {
    localStorage.setItem('accountRecover', JSON.stringify(account));
  }

  saveRegisterStep(step: number, data: any) {
    localStorage.setItem(`register-step-${step}`, JSON.stringify(data));
  }

  getSecret(): string {
    return atob(localStorage.getItem('xxxxx'));
  }

  getSession(): AccountModel {
    const account: string = localStorage.getItem('session');
    if (!account) return null;
    return JSON.parse(account);
  }

  getAccountRecover(): AccountModel {
    const account: string = localStorage.getItem('accountRecover');
    if (!account) return null;
    return JSON.parse(account);
  }

  getRegisterStep(step: number) {
    const data = localStorage.getItem(`register-step-${step}`);
    if (!data) return null;
    return JSON.parse(data);
  }

  deleteSecret() {
    localStorage.removeItem('xxxxx');
  }

  deleteSession() {
    localStorage.removeItem('session');
  }

  logout() {
    this.deleteSecret();
    this.deleteSession();
  }

  // PAYMENT CACHE
  getPaymentProduct(): Product {
    const subscription: SubscriptionModel = this.getSubscriptionCache();
    const payment: Payment = this.getFirstPaymentCache();
    if (subscription) {
      return subscription.product;
    } else if (payment) {
      return payment.shoppingCart.products[0].product;
    }
    return null;
  }

  savePaypalPayment(payment: Payment) {
    localStorage.setItem('paypal-payment', JSON.stringify(payment));
  }

  getPaypalPayment(): Payment {
    const token: string = localStorage.getItem('paypal-payment');
    if (!token) return null;
    return JSON.parse(token);
  }

  saveFirstPaymentCache(payment: Payment): void {
    localStorage.setItem('first-payment', JSON.stringify(payment));
  }

  getFirstPaymentCache(): Payment {
    const token: string = localStorage.getItem('first-payment');
    if (!token) return null;
    return JSON.parse(token);
  }

  saveSubscriptionCache(payment: SubscriptionModel): void {
    localStorage.setItem('subscription', JSON.stringify(payment));
  }

  getSubscriptionCache(): SubscriptionModel {
    const token: string = localStorage.getItem('subscription');
    if (!token) return null;
    return JSON.parse(token);
  }

  saveSubscriptionProductList(list): void {
    localStorage.setItem('sub-prod-list', JSON.stringify(list));
  }

  getSubscriptionProductList(): any {
    const token: string = localStorage.getItem('sub-prod-list');
    if (!token) return null;
    return JSON.parse(token);
  }

  // SOR
  saveSorAccount(sorAccount: any): void {
    localStorage.setItem('sor-account', JSON.stringify(sorAccount));
  }

  getSorAccount(): any {
    const sorAccount: string = localStorage.getItem('sor-account');
    if (!sorAccount) return null;
    return JSON.parse(sorAccount);
  }
}
