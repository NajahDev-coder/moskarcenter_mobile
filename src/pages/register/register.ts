import { Component } from '@angular/core';
import { NavController , ToastController } from 'ionic-angular';
import { DbworkProvider } from "../../providers/dbwork/dbwork";
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  resposeData : any;
  register: {
    "user_login"?: string,
    "user_pass"?: string,
    "user_email"?: string,
    "typeCompte"?: string
    } = {};

  constructor(public navCtrl: NavController ,public storage: Storage, public db : DbworkProvider, private toastCtrl:ToastController) {

  }

  onRegister(form) {
    if (form.valid) {
      localStorage.setItem('type_compte', this.register.typeCompte);
      this.db.register(this.register.user_email, this.register.user_login, this.register.user_pass)
        .subscribe(
          data => {
            if (data.json().status == 'ok') {
              let toast = this.toastCtrl.create({
                message : 'Bienvenue! Vous êtes Connecté!',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              
              this.db.login(this.register.user_login, this.register.user_pass);
              this.storage.get('userLoginInfo').then( data => {
                  if (this.register.typeCompte == "proffesionel") {
                    this.navCtrl.setRoot(ProfilePage, {'validpro': true});
                  } else {
                    this.navCtrl.setRoot(HomePage);
                  }
              });              
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
              message : "Email ou Identifiant dèja utilisé",
              duration: 3000,
              position: 'bottom'
          });
          toast.present();

          },
          () => {}
        );
    } 
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
