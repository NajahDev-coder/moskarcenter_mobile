import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbworkProvider } from '../providers/dbwork/dbwork';
import { ValidatePro } from '../pages/validate_pro/validatepro';
import { ProfilePage } from '../pages/profile/profile';
import { PaymentPro } from '../pages/payment/payment';
import { BienvenuePage } from '../pages/bienvenue/bienvenue';
import { PaymentModePage } from '../pages/paymentmode/paymentmode';
import { LemonWayPaymentPage } from '../pages/lemonwaypayment/lemonwaypayments';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ValidatePro,
    ProfilePage,
    PaymentPro,
    BienvenuePage,
    PaymentModePage,
    LemonWayPaymentPage,
  ],
  imports: [
    BrowserModule,HttpClientModule,HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ValidatePro,
    ProfilePage,
    PaymentPro,
    BienvenuePage,
    PaymentModePage,
    LemonWayPaymentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbworkProvider
  ]
})
export class AppModule {}
