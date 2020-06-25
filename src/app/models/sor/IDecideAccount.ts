export class IDecideAccount {
  public constructor(
    public emailAddress: string,
    public phoneNumber: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public languageCode: string,
    public sendWelcomeEmail: boolean
  ) {}
}
