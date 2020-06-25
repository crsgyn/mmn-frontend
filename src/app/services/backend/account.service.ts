import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';
import { AccountModel } from '../../models/AccountModel';
import { ChangePass } from '../../models/ChangePass';
import { Login } from '../../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  debug = 'true';

  constructor(private http: HttpClient) {}

  public login(login: Login): Observable<AccountModel | any> {
    return this.http.post<Login>(`${ENV.accountServiceURL}/login`, login);
  }

  public listAll(): Observable<Array<AccountModel> | any> {
    return this.http.get<Array<AccountModel>>(`${ENV.accountServiceURL}`);
  }

  public signup(account: AccountModel): Observable<AccountModel | any> {
    return this.http.post<AccountModel>(`${ENV.accountServiceURL}`, {
      account: account,
      link: ENV.confirmAccountLink
    });
  }

  public exists(account: AccountModel): Observable<any> {
    return this.http.post<any>(`${ENV.accountServiceURL}`, account);
  }

  public verifyInviteToken(token: string): Observable<string> {
    const body = {
      inviteToken: token
    };
    return this.http.post(
      `${ENV.accountServiceURL}/invite/verify-token`,
      body,
      {
        responseType: 'text'
      }
    );
  }

  public forgot(email: string) {
    const changepass = new ChangePass();
    changepass.email = email;
    changepass.link = ENV.recoverLink;
    const requestOptions: Object = {
      responseType: 'text'
    };
    return this.http.post<string>(
      `${ENV.accountServiceURL}/pass/forgot`,
      changepass,
      requestOptions
    );
  }

  public mailForgot(token: string): Observable<AccountModel> {
    return this.http.get<AccountModel>(
      `${ENV.accountServiceURL}/mail/recover`,
      {
        params: {
          token: token
        }
      }
    );
  }

  public mailConfirm(id: string): Observable<AccountModel> {
    return this.http.get<AccountModel>(
      `${ENV.accountServiceURL}/mail/confirm`,
      {
        params: {
          id: id
        }
      }
    );
  }

  public changePass(newPass: string, account: AccountModel): Observable<number> {
    account.password = newPass;
    return this.http.put<number>(`${ENV.accountServiceURL}/pass/update`, account);
  }

  /** TREE */
  public showTree(accountId: string): Observable<any> {
    return this.http.get<any>(`${ENV.accountServiceURL}/level/tree/${accountId}`);
  }
}
