import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbworkProvider } from '../providers/dbwork/dbwork';
import { ProfilePage } from '../pages/profile/profile';
import { PaymentPro } from '../pages/payment/payment';
import { PaymentModePage } from '../pages/paymentmode/paymentmode';
import { LemonWayPaymentPage } from '../pages/lemonwaypayment/lemonwaypayments';
import { IonicStorageModule } from '@ionic/storage';
import { WoocommerceProvider } from "../providers/woocommerce/woocommerce";
import {CategoriesPage} from "../pages/categories/categories";
import {ProductDetailsPage} from "../pages/products/details/details";
import {CommandesPage} from "../pages/commandes/list/commandes";
import {ProductsPage} from "../pages/products/list/products";
import { AddProductPage } from '../pages/products/add/addProduct';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    PaymentPro,
    PaymentModePage,
    LemonWayPaymentPage,
    CategoriesPage,
    ProductDetailsPage,
    CommandesPage,
    ProductsPage,
    AddProductPage,
  ],
  imports: [
    BrowserModule,HttpClientModule,HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    PaymentPro,
    PaymentModePage,
    LemonWayPaymentPage,
    CategoriesPage,
    ProductDetailsPage,
    CommandesPage,
    ProductsPage,
    AddProductPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbworkProvider,
    WoocommerceProvider,
  ]
})
export class AppModule {}
