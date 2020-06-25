import { Component, OnInit } from '@angular/core';
import { I18nData } from 'src/app/models/translation/i18nData';
import { I18nService } from 'src/app/services/backend/i18n.service';

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.scss']
})
export class LanguageConfigComponent implements OnInit {
  supportedLangsFlags = {
    en: 'us',
    pt: 'br',
    es: 'es'
  };

  error = null;

  showError() {
    return this.error;
  }

  LANGUAGES: Map<string, I18nData[]> = new Map<string, I18nData[]>();
  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.i18nService.allData().subscribe((data: I18nData[]) => {
      if (data) {
        this.LANGUAGES = this.groupBy(data);
      }
      this.error = null;
    }, error => {
      this.error = error;
    });
  }

  getSupportedLangFlag(key: string): string {
    return this.supportedLangsFlags[key];
  }

  private groupBy(data): Map<string, I18nData[]> {
    const group = data.reduce((result, lang) => {
      result[lang.language] = [...(result[lang.language] || []), lang];
      return result;
    }, {});
    return group;
  }
}
