export class SorAccount {
  public constructor(
    public Email: string,
    public ContractNumber: string,
    public Password: string,
    public FirstName: string,
    public LastName: string,
    public Address: string,
    public City: string,
    public TwoLetterCountryCode: string,
    public Phone: string,
    public UserAccountTypeId: string,
    public ReferringUserId: string,
    public OtherID: string
  ) {}
}
