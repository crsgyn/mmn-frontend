import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './components/from-mail/change-password/change-password.component';
import { ConfirmAccountComponent } from './components/from-mail/confirm-account/confirm-account.component';
import { RecoverAccountComponent } from './components/from-mail/recover-account/recover-account.component';
import { DashboardPageComponent } from './components/home/dashboard-page/dashboard-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsPageComponent } from './components/home/products-page/products-page.component';
import { ProfilePageComponent } from './components/home/profile-page/profile-page.component';
import { LanguageConfigComponent } from './components/home/settings-page/language-config/language-config.component';
import { SettingsPageComponent } from './components/home/settings-page/settings-page.component';
import { UsersConfigComponent } from './components/home/settings-page/users-config/users-config.component';
import { LogoComponent } from './components/logo/logo.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ForgotPassComponent } from './components/signin/forgot-pass/forgot-pass.component';
import { PaymentValidationComponent } from './components/signin/payment-validation/payment-validation.component';
import { SubscriptionPaymentComponent } from './components/signin/payment-validation/subscription-payment/subscription-payment.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { NgbDateCustomParserFormatter } from './NgbDateCustomParserFormatter';
import { I18NServiceProvider } from './providers/i18n-service.provider';
import { ModalComponent } from './shared/components/modal/modal.component';
import { BasicAuthInterceptor } from './providers/basic-auth-interceptor.provider';
import { CookieLawModule } from 'angular2-cookie-law';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SorAccountValidationComponent } from './components/signin/sor-account-validation/sor-account-validation.component';
import { TreePageComponent } from './components/home/tree-page/tree-page.component';
import { IdecidePageComponent } from './components/home/idecide-page/idecide-page.component';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SubscriptionPaymentComponent,
    DashboardPageComponent,
    HomeComponent,
    ForgotPassComponent,
    ShoppingCartComponent,
    UnderConstructionComponent,
    ConfirmAccountComponent,
    ProfilePageComponent,
    ProductsPageComponent,
    SettingsPageComponent,
    LogoutComponent,
    ModalComponent,
    LanguageConfigComponent,
    ChangePasswordComponent,
    TermsAndConditionsComponent,
    PaymentValidationComponent,
    LogoComponent,
    UsersConfigComponent,
    RecoverAccountComponent,
    SorAccountValidationComponent,
    TreePageComponent,
    IdecidePageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CookieLawModule,
    PdfViewerModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxYoutubePlayerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    I18NServiceProvider,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    {
      provide: NgbDateParserFormatter,
      useFactory: () => {
        return new NgbDateCustomParserFormatter('DD-MM-YYYY');
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
