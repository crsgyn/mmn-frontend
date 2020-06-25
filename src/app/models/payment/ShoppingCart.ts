import { ShoppingCartStatus } from 'src/app/enum/ShoppingCartStatus';
import { ShoppingType } from 'src/app/enum/ShoppingType';
import { Address } from '../Address';
import { CartProduct } from './CartProduct';
import { Payment } from './Payment';

// tslint:disable-next-line: class-name
export class ShoppingCart {
  public constructor(init?: Partial<ShoppingCart>) {
    Object.assign(this, init);
  }

  id?: string;
  accountId?: string;
  alternativeAddress?: Address;
  products?: CartProduct[];
  creationDate?: Date;

  payment?: Payment;
  shoppingType: ShoppingType;
  shoppingCartStatus: ShoppingCartStatus;
}
