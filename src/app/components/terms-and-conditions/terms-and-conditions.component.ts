import { Component, OnInit } from '@angular/core';
import { I18NServiceProvider } from 'src/app/providers/i18n-service.provider';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
  pdfSrc: any;

  constructor(private i18NServiceProvider: I18NServiceProvider) {}

  ngOnInit() {
    this.i18NServiceProvider.getCurrentLanguagePackLoaded().subscribe(
      lang => {
        console.log(
          'TCL: TermsAndConditionsComponent -> ngOnInit -> lang',
          lang
        );
        this.pdfSrc = `assets/pdf/Travined_terms_${lang}.pdf`;
        console.log(
          'TCL: TermsAndConditionsComponent -> ngOnInit -> pdfSrc',
          this.pdfSrc
        );
      },
      langError => {
        console.log(
          'TCL: TermsAndConditionsComponent -> ngOnInit -> langError',
          langError
        );
      }
    );
  }
}
