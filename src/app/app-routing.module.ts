import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardPageComponent } from './components/home/dashboard-page/dashboard-page.component';
import { ForgotPassComponent } from './components/signin/forgot-pass/forgot-pass.component';
import { ProfilePageComponent } from './components/home/profile-page/profile-page.component';
import { SettingsPageComponent } from './components/home/settings-page/settings-page.component';
import { ProductsPageComponent } from './components/home/products-page/products-page.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PaymentGuard } from './guards/payment.guard';
import { PaymentValidationComponent } from './components/signin/payment-validation/payment-validation.component';
import { RecoverAccountComponent } from './components/from-mail/recover-account/recover-account.component';
import { ChangePasswordComponent } from './components/from-mail/change-password/change-password.component';
import { ConfirmAccountComponent } from './components/from-mail/confirm-account/confirm-account.component';
import { SorGuard } from './guards/sor.guard';
import { SorAccountValidationComponent } from './components/signin/sor-account-validation/sor-account-validation.component';
import { TreePageComponent } from './components/home/tree-page/tree-page.component';
import { IdecidePageComponent } from './components/home/idecide-page/idecide-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard, PaymentGuard, SorGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'tree', component: TreePageComponent },
      { path: 'idecide', component: IdecidePageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'settings', component: SettingsPageComponent }
    ]
  },
  {
    path: 'sor-validation',
    component: SorAccountValidationComponent,
    canActivate: [AuthGuard, PaymentGuard]
  },
  {
    path: 'payment-validation',
    component: PaymentValidationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-confirm',
    component: ConfirmAccountComponent
  },
  {
    path: 'recover',
    component: RecoverAccountComponent
  },
  {
    path: 'change-pass',
    component: ChangePasswordComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ForgotPassComponent },
  { path: '**', redirectTo: '' }
];

const config = { useHash: true, enableTracing: false };

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
