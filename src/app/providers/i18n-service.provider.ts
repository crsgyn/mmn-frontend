import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { I18nService } from '../services/backend/i18n.service';

@Injectable()
export class I18NServiceProvider {
  private languagePackLoaded: BehaviorSubject<string>;

  constructor(
    public http: HttpClient,
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {
    this.languagePackLoaded = new BehaviorSubject<string>('en');
  }

  public getTranslation(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.translateService.get(key).subscribe(
        translated => resolve(translated),
        error => reject(error)
      );
    });
  }

  public getCurrentLanguagePackLoaded() : Observable<string> {
    return this.languagePackLoaded.asObservable();
  }

  public setCurrentLanguagePackLoaded(lang: string) : void {
    return this.languagePackLoaded.next(lang);
  }


  public getLanguagePack(lang: string): Promise<JSON> {
    return new Promise((resolve, reject) => {
      this.loadI18nLanguagePack(lang).subscribe(
        (data) => {
          this.setCurrentLanguagePackLoaded(lang);
          resolve(data.dictionary);
        },
        error => {
          /* retry with mock */
          this.loadI18nLanguagePackFromMock(lang).subscribe(
            mockData => {
              this.setCurrentLanguagePackLoaded(lang);
              console.log(
                `Error trying to get the language pack for the language "${lang}" from the server => fallback to mock.`
              );
              resolve(mockData);
            },
            mockError => {
              console.log(
                `Error trying to get the language pack for the language "${lang}" from the server and from mock.`
              );
              reject(mockError);
            }
          );
        }
      );
    });
  }

  private loadI18nLanguagePack(lang: string): Observable<any> {
    console.log('loading lang pack ' + lang + ' from server');
    return this.i18nService.by(lang);
  }

  private loadI18nLanguagePackFromMock(lang: string): Observable<any> {
    console.log('loading lang pack ' + lang + ' from mock');
    return this.http.get<any>(`assets/i18n/${lang}.json`);
  }
}
