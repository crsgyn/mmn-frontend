export class ChangePass {
  public constructor(init?: Partial<ChangePass>) {
    Object.assign(this, init);
  }
  email: string;
  newPass: string;
  link: string;
}
