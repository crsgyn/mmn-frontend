export class SorLoginToken {
  public constructor(
    public token: string,
    public generateTimeMilis: number,
    public expireTimeMilis: number
  ) {}
}
