import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment';
import { I18nData } from '../../models/translation/i18nData';
import { I18nDto } from '../../models/translation/i18nDto';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor(private http: HttpClient) {}

  public allData(): Observable<Array<I18nData>> {
    return this.http
      .get<Array<I18nData>>(`${ENV.languagePackServiceURL}`);
  }

  public by(lang: string): Observable<I18nDto> {
    return this.http
      .get<I18nDto>(`${ENV.languagePackServiceURL}/${lang}`);
  }

  public saveOne(lang: I18nData): Observable<I18nData> {
    return this.http
      .get<I18nData>(`${ENV.languagePackServiceURL}/one`);
  }

  public saveMany(lang: I18nDto): Observable<Array<I18nData>> {
    return this.http
      .get<Array<I18nData>>(`${ENV.languagePackServiceURL}/many`);
  }

  public deleteOne(lang: I18nData): Observable<string> {
    return this.http
      .get<string>(`${ENV.languagePackServiceURL}/one`);
  }

  public deleteMany(lang: I18nDto): Observable<Array<string>> {
    return this.http
      .get<Array<string>>(`${ENV.languagePackServiceURL}/many`);
  }
}
