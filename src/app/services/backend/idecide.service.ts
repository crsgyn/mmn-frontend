import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i18nIsoCountries from 'i18n-iso-countries';
import { Observable } from 'rxjs';
import { IDecideAccount } from 'src/app/models/sor/IDecideAccount';
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IDecideService {
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
  public idecideCreate(
    idecideAccount: IDecideAccount,
    travinedAccountId: string
  ): Observable<any> {
    const body = {
      idecideAccount: idecideAccount,
      travinedAccountId: travinedAccountId
    };
    return this.http.post<any>(ENV.idecideServiceURL + '/create', body);
  }
}
