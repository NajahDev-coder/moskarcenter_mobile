import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DbworkProvider } from '../providers/dbwork/dbwork';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  categories: Array<{id: string}>;

  constructor(public platform: Platform, public storage: Storage, private db: DbworkProvider, public statusBar: StatusBar, public splashScreen: SplashScreen, private menu: MenuController) {
    this.initializeApp();
    // this.getCategories();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getCategories() {
    this.db.getCategories()
      .subscribe(
        data => this.categories = data,
        err => console.log(err),
        () => console.log('categories')
      );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }


  notifications() {

  }

  messages () {

  }

  articles () {

  }

  produits() {

  }

  commandes() {

  }

  clients() {

  }

  home () {
    this.openPage(HomePage);
  }

  login() {
    this.openPage(LoginPage);
  }

  register() {
    this.openPage(RegisterPage);
  }

  profile() {
    this.openPage(ProfilePage);
  }

  loggedIn() {
    return true;
  }

  logout() {
    this.menu.close();
    localStorage.removeItem('cookie');
    localStorage.removeItem('ID');
    localStorage.removeItem('nonce');
    this.openPage(LoginPage);

  }
}
