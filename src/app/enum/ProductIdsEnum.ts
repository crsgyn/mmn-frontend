import { SorSubscriptionPlans } from './sor-enums/SorSubscriptionPlans';

export class ProductIdsEnum {
  static readonly Basic = new ProductIdsEnum(
    'Basic',
    SorSubscriptionPlans.Basic,
    '13186',
    'subscriptions.pack.1.description'
  );
  static readonly ThreeStars = new ProductIdsEnum(
    'ThreeStars',
    SorSubscriptionPlans.ThreeStars,
    '13185',
    'subscriptions.pack.2.description'
  );
  static readonly FourStars = new ProductIdsEnum(
    'FourStars',
    SorSubscriptionPlans.FourStars,
    '13184',
    'subscriptions.pack.3.description'
  );
  static readonly FiveStars = new ProductIdsEnum(
    'FiveStars',
    SorSubscriptionPlans.FiveStars,
    '13159',
    'subscriptions.pack.4.description'
  );

  static LIST: ProductIdsEnum[] = [
    ProductIdsEnum.Basic,
    ProductIdsEnum.ThreeStars,
    ProductIdsEnum.FourStars,
    ProductIdsEnum.FiveStars
  ];

  // private to disallow creating other instances of this type
  private constructor(
    private readonly key: string,
    public readonly index: string,
    public readonly vacationClubId: string,
    public readonly translationKey: string
  ) {}

  public static matchTranslationKey(translationkey: string): string {
    return this.match('translationKey', translationkey);
  }

  public static matchVacationClubId(vacationClubId: string): string {
    return this.match('vacationClubId', vacationClubId);
  }
  private static match(propertyName: string, propertyValue: string): string {
    const result: ProductIdsEnum[] = ProductIdsEnum.LIST.filter(
      p => p[propertyName] === propertyValue
    );
    if (result.length === 1) {
      const index = result[0].index;
      console.log('TCL: ProductIdsEnum -> index', index);
      return index;
    }
    return ProductIdsEnum.Basic.index;
  }

  toString() {
    return this.key;
  }
}
