export class Address {
  public constructor(init?: Partial<Address>) {
    Object.assign(this, init);
  }
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}
