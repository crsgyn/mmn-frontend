import { Product } from './Product';
import { ShoppingCart } from './ShoppingCart';

// tslint:disable-next-line: class-name
export class CartProduct {
  public constructor(init?: Partial<CartProduct>) {
    Object.assign(this, init);
  }

  id?: string;
  product?: Product;
  quantity?: number;
  price?: number;
  discount?: number;
}
