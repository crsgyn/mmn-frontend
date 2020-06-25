// tslint:disable-next-line: class-name
import { Product } from './Product';

export class SubscriptionModel {
  public constructor(init?: Partial<SubscriptionModel>) {
    Object.assign(this, init);
  }

  id?: string;
  accountId?: string;
  product: Product;
  start?: Date;
  current?: Date;
  next?: Date;
  renovationTimes?: number;
  invitationLeft?: number;
}
