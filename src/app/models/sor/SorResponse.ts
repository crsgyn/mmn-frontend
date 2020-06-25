export class SorResponse {
  public constructor(
    public Account: { UserId: string },
    public ResultType: string,
    public Message: string
  ) {}
}
