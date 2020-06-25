// tslint:disable-next-line: class-name
import { PaymentMethod } from 'src/app/enum/PaymentMethod';
import { ShoppingCart } from './ShoppingCart';

export class Payment {
  public constructor(init?: Partial<Payment>) {
    Object.assign(this, init);
  }

  id?: string;
  value?: string;
  currency_code?: string;
  method?: PaymentMethod;
  shoppingCart?: ShoppingCart;
}
