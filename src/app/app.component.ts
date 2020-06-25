import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment as ENV } from 'src/environments/environment';
import { I18NServiceProvider } from './providers/i18n-service.provider';
import { CachingService } from './services/caching.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn = false;
  smallLogo = ENV.imageLogoSmall;
  supportedLangs = ['en', 'pt', 'es'];
  supportedLangsFlags = {
    en: 'flag-icon flag-icon-us',
    pt: 'flag-icon flag-icon-br',
    es: 'flag-icon flag-icon-es'
  };

  currentLang = this.supportedLangs[0];
  currentLangFlag = this.supportedLangsFlags[0];

  constructor(
    private translateService: TranslateService,
    private cachingService: CachingService,
    private i18NServiceProvider: I18NServiceProvider
  ) {
    this.setDefaultLang();
  }

  setDefaultLang() {
    this.translateService.setDefaultLang(this.currentLang);
    const browserLang = this.translateService.getBrowserLang();
    if (this.supportedLangs.includes(browserLang)) {
      this.currentLang = browserLang;
      this.currentLangFlag = this.supportedLangs[this.currentLang];
    }
    this.setLang(this.currentLang);
  }

  setLang(lang: string) {
    this.currentLang = lang;
    this.currentLangFlag = this.supportedLangs[this.currentLang];
    this.i18NServiceProvider
      .getLanguagePack(lang)
      .then(languagePack => {
        this.i18NServiceProvider
          .getCurrentLanguagePackLoaded()
          .subscribe(lang => {
            this.translateService.setTranslation(lang, languagePack);
            this.translateService.use(lang);
            console.log(`Language Pack loaded from API was "${lang}"`);
          });
      })
      .catch(error => {
        console.error(
          `Language Pack can not be loaded from API. Error ${error}`
        );
      });
  }

  onChangeOfRoutes(event) {
    if (this.cachingService.getSession()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
}
