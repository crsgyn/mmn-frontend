import { Address } from './Address';
import { AccountStatus } from '../enum/AccountStatus';

// tslint:disable-next-line: class-name
export class AccountModel {
  public constructor(init?: Partial<AccountModel>) {
    Object.assign(this, init);
  }

  id?: string;
  name?: string;
  lastName?: string;
  birthDate?: Date;
  address?: Address;
  email?: string;
  phone?: string;
  role: string;
  password?: string;
  accountStatus: AccountStatus;
  creationDate?: string;
  inviteToken?: string;

  public static isPrivilegedAccount(role: string): boolean {
    return ['ADMIN', 'INVESTOR', 'AMBASSADOR'].indexOf(role) != -1;
  }

  public static isInvestorOrAmbassador(role: string): boolean {
    return ['INVESTOR', 'AMBASSADOR'].indexOf(role) != -1;
  }



  public static isAdmin(role: string): boolean {
    return ['ADMIN'].indexOf(role) != -1;
  }
}
