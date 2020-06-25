import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';

import { AccountModel } from '../../models/AccountModel';
import { SorAccount } from '../../models/sor/SorAccount';
import { SorLoginToken } from '../../models/sor/SorLoginToken';
import { SorResponse } from '../../models/sor/SorResponse';

@Injectable({
  providedIn: 'root'
})
export class SorService {
  alreadyExistMsg = [
    'A user with email admin@travined.com is already a member of this club.'
  ];
  createErrorMsgs = 'An error has occurred.';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    i18nIsoCountries.registerLocale(
      require('i18n-iso-countries/langs/en.json')
    );
  }

  getCountriesList() {
    return i18nIsoCountries.getNames('en');
  }

  get2LetterCountryCode(countryName: string) {
    return i18nIsoCountries.getAlpha2Code(countryName, 'en');
  }

  // BACKEND SERVICE
  public sorCreate(
    subscriptionId: string,
    account: AccountModel,
    password: string,
    accountTypeId: string
  ): Observable<SorResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('subscriptionId', subscriptionId);
    const httpOptions = {
      headers: headers
    };

    const body = new SorAccount(
      account.email,
      account.id,
      password,
      account.name,
      account.lastName,
      account.address.street,
      account.address.city,
      this.get2LetterCountryCode(account.address.country),
      account.phone,
      accountTypeId,
      null,
      account.inviteToken
    );
    console.log(body, httpOptions);
    return this.http.post<SorResponse>(
      ENV.reservationServiceURL + '/create-user',
      body,
      httpOptions
    );
  }

  public sorMembers(payload: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(
      ENV.reservationServiceURL + '/members',
      payload
    );
  }

  public sorLoginToken(
    subscriptionId: string,
    account: AccountModel
  ): Observable<SorLoginToken> {
    let headers = new HttpHeaders();
    headers = headers.set('subscriptionId', subscriptionId);
    const httpOptions = {
      headers: headers
    };

    const body = {
      Email: account.email,
      ContractNumber: account.id
    };
    console.log(body, httpOptions);
    return this.http.post<SorLoginToken>(
      ENV.reservationServiceURL + '/login',
      body,
      httpOptions
    );
  }

  //
  public fetchTokenAndNavigate(
    subscriptionId: string,
    account: AccountModel,
    cardLink: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sorLoginToken(subscriptionId, account).subscribe(
        (data: SorLoginToken) => {
          if (data) {
            console.log(data);
            resolve('success');
            this.navigate(data.token, cardLink);
          }
        },
        error => {
          reject(error);
          console.log(error);
        }
      );
    });
  }

  private navigate(token: string, cardLink: string): void {
    const URL = ENV.sorRedirectUrl + token + '&RedirectURL=' + cardLink;
    console.log(URL);
    window.open(URL, '_blank');
  }

  private validateToken(token: SorLoginToken): boolean {
    // less than 10 min?
    return token.generateTimeMilis < token.expireTimeMilis;
  }

  // CACHE
  saveTokenOnCache(token: SorLoginToken): void {
    localStorage.setItem('sor-token', JSON.stringify(token));
  }

  getCachedToken(): SorLoginToken {
    const token: string = localStorage.getItem('sor-token');
    if (!token) return null;
    return JSON.parse(token);
  }

  deleteToken(): void {
    localStorage.removeItem('sor-token');
  }
}
