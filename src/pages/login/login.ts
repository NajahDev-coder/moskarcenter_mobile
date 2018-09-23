import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  login: {
    "username"?: string,
    "password"?: string,
  } = {};


  constructor(public navCtrl: NavController, public storage: Storage, private db: DbworkProvider, private toastCtrl:ToastController, public events: Events) {

  }

  onLogin(form) {
    if (form.valid) {
      this.db.login(this.login.username, this.login.password);
      this.storage.get('userLoginInfo').then( data => {
        // update menu for logged in
        //this.events.publish("updateMenu");
        this.navCtrl.setRoot(HomePage);

      });
    }
  }

  goToRegister(){
    this.navCtrl.setRoot(RegisterPage);
  }


   presentToast(msg) {
     let toast = this.toastCtrl.create({
       message: msg,
       duration: 2000
     });
     toast.present();
   }
}
