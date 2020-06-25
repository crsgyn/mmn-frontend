// tslint:disable-next-line: class-name
export class Login {
  public constructor(init?: Partial<Login>) {
    Object.assign(this, init);
  }
  login: string;
  password: string;
}
