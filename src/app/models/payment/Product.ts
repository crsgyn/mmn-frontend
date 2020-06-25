// tslint:disable-next-line: class-name
export class Product {
  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  id?: string;
  name?: string;
  description?: string;
  renovation?: string;
  price?: number;
  priceTC?: number;
  renovationPrice?: number;
  renovationPriceTC?: number;
  params?: Array<{ param: string; value: string }>;
  category?: string;
  imageUrl?: string;
}
