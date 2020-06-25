// tslint:disable-next-line: class-name
export class OrderRequest {
  public constructor(init?: Partial<OrderRequest>) {
    Object.assign(this, init);
  }
  intent: string;
  // tslint:disable-next-line: variable-name
  purchase_units: Purchase[];
}

export class Purchase {
  public constructor(init?: Partial<Purchase>) {
    Object.assign(this, init);
  }
  description: string;
  amount: Amount;
}

export class Amount {
  public constructor(init?: Partial<Amount>) {
    Object.assign(this, init);
  }
  // tslint:disable-next-line: variable-name
  currency_code: string;
  value: string;
}
