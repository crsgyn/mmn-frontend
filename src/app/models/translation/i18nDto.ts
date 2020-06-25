export class I18nDto {
  public constructor(
    public locale: string,
    public dictionary: Map<String,String>
  ) {}
}
