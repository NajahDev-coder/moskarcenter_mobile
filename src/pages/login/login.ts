import { Component } from '@angular/core';

import { NavController, ToastController  } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  login: {
    "username"?: string,
    "password"?: string,
  } = {};


  constructor(public navCtrl: NavController, private db: DbworkProvider, private toastCtrl:ToastController) {

  }

  onLogin(form) {
    if (form.valid) {
      this.db.login(this.login.username, this.login.password)
        .subscribe(
          data => {
            if (data.json().status == 'ok') {
              localStorage.setItem('cookie', data.json().cookie);
              localStorage.setItem('ID', data.json().user.id);
            
              let toast = this.toastCtrl.create({
                message : 'Bienvenue! Vous êtes Connecté!',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.setRoot(HomePage);
            } else {
              let toast = this.toastCtrl.create({
                message : data.json().error,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          err => {
            let toast = this.toastCtrl.create({
              message : "Erreur Lors du Login",
              duration: 3000,
              position: 'bottom'
          });
          toast.present();

          },
          () => {}
        );
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
